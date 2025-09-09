
# app.py (safer debug-friendly version)
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, get_jwt_identity, jwt_required
)
from datetime import timedelta, datetime
import os
import logging

# load .env
load_dotenv()

# logging
logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

app = Flask(__name__)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET", "fallback-secret")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# CORS (adjust origins as needed)
# CORS(app, origins=["http://localhost:5173", "http://localhost:3000"], supports_credentials=True)


CORS(app, origins=["http://localhost:5173", "http://localhost:3000"], supports_credentials=True, expose_headers=["Authorization"], allow_headers=["Content-Type", "Authorization"])


# Initialize PyMongo
mongo_ext = PyMongo(app)
db = mongo_ext.db

# Print collections at startup for quick debug
try:
    log.info("Mongo collections at startup: %s", db.list_collection_names())
except Exception as e:
    log.exception("Could not list collections (Mongo may not be running): %s", e)

# Collections
users = db.users
pizzas = db.pizzas
orders = db.orders

# JWT
jwt = JWTManager(app)

# safe Google GenAI config (only if API key present)
GOOGLE_KEY = os.getenv("GOOGLE_API_KEY")
GENAI = None
if GOOGLE_KEY:
    try:
        import google.generativeai as genai
        genai.configure(api_key=GOOGLE_KEY)
        GENAI = genai
        log.info("Google Generative AI initialized.")
    except Exception as e:
        log.exception("Failed to initialize google.generativeai: %s", e)
else:
    log.info("No GOOGLE_API_KEY provided; /chat will return a helpful error.")

# ensure unique index on users.email (guard against error)
try:
    users.create_index('email', unique=True)
except Exception as e:
    log.exception("Could not create index on users.email: %s", e)


@app.route("/chat", methods=["POST"])
def chat():
    user_input = (request.json or {}).get("message", "")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    if not GENAI:
        return jsonify({"error": "Generative model not configured (missing GOOGLE_API_KEY)"}), 500
    try:
        model = GENAI.GenerativeModel("gemini-pro")
        resp = model.generate_content(user_input)
        return jsonify({"reply": getattr(resp, "text", str(resp))})
    except Exception as e:
        log.exception("Chat generation failed: %s", e)
        return jsonify({"error": "generation failed", "details": str(e)}), 500


@app.get('/')
def home():
    return {
        "jwt_secret_set": bool(os.getenv("JWT_SECRET")),
        "mongo_uri": app.config.get('MONGO_URI')
    }


@app.get('/db-test')
def db_test():
    try:
        return {'collections': db.list_collection_names()}, 200
    except Exception as e:
        log.exception("db-test failed: %s", e)
        return {'error': str(e)}, 500


@app.post('/auth/register')
def register():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()   # normalize
    pw = data.get('password')
    if not email or not pw:
        return jsonify(msg='Email & Password required'), 400
    try:
        if users.find_one({'email': email}):
            return jsonify(msg="User already registered"), 409
        res = users.insert_one({'email': email, 'password': generate_password_hash(pw)})
        log.info("Registered user: %s id=%s", email, res.inserted_id)
        return jsonify(msg='Registered', id=str(res.inserted_id)), 201
    except Exception as e:
        log.exception("Register failed: %s", e)
        return jsonify(msg='register failed', error=str(e)), 500


@app.post('/auth/login')
def login():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()   # normalize
    pw = data.get('password')
    if not email or not pw:
        return jsonify(msg='Email & Password required'), 400

    user = users.find_one({'email': email})
    if not user:
        log.info("Login failed: user not found %s", email)
        return jsonify(msg="email not registered"), 404

    if not check_password_hash(user['password'], pw):
        log.info("Login failed: bad password for %s", email)
        return jsonify(msg="incorrect password"), 401

    token = create_access_token(identity=email)
    log.info("Login success: %s", email)
    return jsonify(access_token=token), 200





@app.post("/feedback")
@jwt_required(optional=True)   # feedback can be given with or without login
def add_feedback():
    try:
        data = request.get_json() or {}
        message = data.get("message")
        rating = data.get("rating")
        
        if not message:
            return jsonify(msg="Feedback message is required"), 400
        
        feedback = {
            "email": get_jwt_identity(),  # logged-in user email if available
            "message": message,
            "rating": rating,
            "ts": datetime.utcnow().isoformat(),
        }
        res = db.feedback.insert_one(feedback)
        return jsonify(msg="Feedback submitted", id=str(res.inserted_id)), 201
    except Exception as e:
        return jsonify(msg="Feedback failed", error=str(e)), 500















@app.route("/menu", methods=["GET"])
def menu():
    try:
        items = list(pizzas.find({}, {"_id": 0}))
        return jsonify(items), 200
    except Exception as e:
        log.exception("menu fetch failed: %s", e)
        return jsonify(msg="menu fetch failed", error=str(e)), 500

@app.route("/pizzas", methods=["GET"])
def pizz():
    try:
        items = list(pizzas.find({}, {"_id": 0}))
        return jsonify(items), 200
    except Exception as e:
        log.exception("menu fetch failed: %s", e)
        return jsonify(msg="menu fetch failed", error=str(e)), 500


# @app.post('/orders')
# @jwt_required()
# def create_order():
#     email = get_jwt_identity()
#     data = request.get_json() or {}
#     items = data.get("items", [])
#     total = data.get("total", 0)
#     if not items:
#         return jsonify(msg="no items found"), 400
#     try:
#         now = datetime.utcnow()
#         order = {
#             "email": email,
#             "items": items,
#             "total": total,
#             "ts": now.isoformat(),
#             "dow": now.weekday(),
#             "hour": now.hour,
#         }
#         res = orders.insert_one(order)
#         return jsonify(msg="order placed", id=str(res.inserted_id)), 201
#     except Exception as e:
#         log.exception("create_order failed: %s", e)
#         return jsonify(msg="order failed", error=str(e)), 500




# app.py (replace only the create_order route)
@app.post('/orders')
@jwt_required()
def create_order():
    email = get_jwt_identity()  # authenticated account email (from JWT)
    data = request.get_json() or {}

    items = data.get("items", [])
    total = data.get("total", 0)

    # contact fields coming from frontend (user-entered)
    contact_email = (data.get("contact_email") or email or "").strip().lower()
    address = (data.get("address") or "").strip()
    phone = (data.get("phone") or "").strip()
    country = (data.get("country") or "").strip()  # optional country code or name

    if not items:
        return jsonify(msg="no items found"), 400

    # require address & phone for delivery
    if not address or not phone:
        return jsonify(msg="address and phone required"), 400

    try:
        now = datetime.utcnow()
        order = {
            "email": email,              # account identity
            "contact_email": contact_email,  # contact provided (or same as account)
            "items": items,
            "total": total,
            "address": address,
            "phone": phone,
            "country": country,
            "ts": now.isoformat(),
            "dow": now.weekday(),
            "hour": now.hour,
        }
        res = orders.insert_one(order)
        return jsonify(msg="order placed", id=str(res.inserted_id)), 201
    except Exception as e:
        log.exception("create_order failed: %s", e)
        return jsonify(msg="order failed", error=str(e)), 500









@app.post('/admin/seed')
def seed():
    try:
        if pizzas.count_documents({}) == 0:
            pizzas.insert_many([
                {"slug": "margherita", "name": "Margherita", "price": 8.0, "tags": ["veg", "classic"],
                 "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"},
                {"slug": "pepperoni", "name": "Pepperoni", "price": 10.5, "tags": ["meat"],
                 "image": "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__480.jpg"},
                {"slug": "bbq-chicken", "name": "BBQ Chicken", "price": 11.0, "tags": ["meat", "bbq"],
                 "image": "https://images.unsplash.com/photo-1601924578416-23a02943a11d"}
            ])
            return jsonify(msg="seeded"), 201
        else:
            return jsonify(msg="already seeded"), 200
    except Exception as e:
        log.exception("seeding failed: %s", e)
        return jsonify(msg="seed failed", error=str(e)), 500


if __name__ == '__main__':
    app.run(debug=True)
