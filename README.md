# 🍕 Pizza Ordering Web App

A full-stack pizza ordering application built with **React (Vite)** for the frontend and **Flask + MongoDB** for the backend.  
Users can browse pizzas, add them to a cart, register/login, place orders, and give feedback.  
                      ---------------------------------------------------------

## ✨ Features
- 🛒 **Cart System** — Add, remove, and update quantities of pizzas  
- 👤 **User Authentication** — Register & login with JWT-based sessions  
- 📦 **Order Placement** — Store and manage orders in MongoDB  
- ⭐ **Feedback System** — Collect customer feedback with ratings  
- 📱 **Responsive Design** — Mobile-first, styled with TailwindCSS  
- 🌍 **Delivery Info** — Capture address, email, phone with country code  

                      ----------------------------------------------------------

## 🛠️ Tech Stack

**Frontend**
- React + Vite  
- React Router  
- TailwindCSS  

**Backend**
- Flask  
- Flask-PyMongo  
- Flask-JWT-Extended  
- MongoDB  

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/pizza-project.git
cd pizza-project
**Backend Setup (Flask)**

# Create virtual environment
python -m venv venv
source venv/bin/activate   # (Linux/macOS)
venv\Scripts\activate      # (Windows)

# Install dependencies
pip install -r requirements.txt

# Create .env file
MONGO_URI=mongodb://localhost:27017/pizza_db
JWT_SECRET_KEY=your-secret-key

# Run Flask server
python app.py
**3. Frontend Setup (React + Vite)**
cd client    # if frontend is in /client
npm install
npm run dev


**By default the frontend runs at:**
👉 http://127.0.0.1:5173


**📂 Project Structure**
pizza-project/
│── backend/              # Flask backend
│   ├── app.py
│   ├── models/
│   └── routes/
│
│── client/               # React frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api.js
│   └── package.json
│
│── .gitignore
│── README.md

📸** Screenshots**


<img width="926" height="435" alt="{DEBDA5F6-9CB0-42BB-A781-D832564B2D87}" src="https://github.com/user-attachments/assets/954e8ba6-808b-435c-96f1-d7ac17bd8df4" />
<img width="917" height="441" alt="{3364E71E-A788-4798-8D06-E79332F3036F}" src="https://github.com/user-attachments/assets/b70175f3-f6d9-4457-b28b-bd9e73476df4" />
<img width="958" height="200" alt="{7536331A-DF1F-49B2-A41C-C966CCF9EF10}" src="https://github.com/user-attachments/assets/927967df-812b-4876-a546-15108c2ab5b1" />


🤝** Contributing**

Fork the repo
Create a new branch (feature/your-feature)
Commit your changes
Open a Pull Request

📜** License**
This project is licensed under the MIT License.

👨‍💻** Author**
khansa urooj
