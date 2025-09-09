import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const COUNTRY_OPTIONS = [
  { code: "PK", dial: "+92", flag: "🇵🇰", label: "Pakistan" },
  { code: "US", dial: "+1", flag: "🇺🇸", label: "United States" },
  { code: "GB", dial: "+44", flag: "🇬🇧", label: "United Kingdom" },
  { code: "IN", dial: "+91", flag: "🇮🇳", label: "India" },
  { code: "CA", dial: "+1", flag: "🇨🇦", label: "Canada" },
];

export default function Cart() {
  const navigate = useNavigate();

  // lazy init from localStorage -> prevents mount-race overwrite
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });

  const [contactEmail, setContactEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(COUNTRY_OPTIONS[0].code);

  // persist whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // restore pending contact fields (if any)
  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem("pendingOrder") || "null");
    if (pending) {
      setContactEmail(pending.contact_email || "");
      setAddress(pending.address || "");
      setPhone(pending.phone || "");
      setCountry(pending.country || COUNTRY_OPTIONS[0].code);
    }
  }, []);

  const total = useMemo(
    () => cart.reduce((s, p) => s + (p.price || 0) * (p.qty || 1), 0),
    [cart]
  );

  const updateQty = (index, qty) => {
    setCart((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], qty: Math.max(0, qty) };
      return copy.filter((c) => c.qty > 0);
    });
  };

  const removeItem = (index) => setCart((prev) => prev.filter((_, i) => i !== index));

  const getDial = (code) => {
    const found = COUNTRY_OPTIONS.find((c) => c.code === code);
    return found ? found.dial : "";
  };

  const payload = () => ({
    items: cart,
    total,
    contact_email: contactEmail,
    address,
    phone: `${getDial(country)} ${phone}`.trim(),
    country,
  });

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");
    if (!contactEmail || !address || !phone) return alert("Enter email, address, phone.");

    const p = payload();
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("pendingOrder", JSON.stringify(p));
      localStorage.setItem("nextAfterLogin", "/cart");
      alert("Please login/register to place your order. You will be returned to Cart.");
      navigate("/login");
      return;
    }

    try {
      const res = await api("/orders", { method: "POST", body: p });
      alert(res.msg || "Order placed!");
      localStorage.removeItem("cart");
      localStorage.removeItem("pendingOrder");
      setCart([]);
      navigate("/menu");
    } catch (err) {
      const msg = err.message || "";
      if (msg.includes("401") || msg.toLowerCase().includes("authorization")) {
        localStorage.setItem("pendingOrder", JSON.stringify(p));
        localStorage.setItem("nextAfterLogin", "/cart");
        alert("Session expired — please login again.");
        navigate("/login");
        return;
      }
      alert(err.message || "Failed to place order");
    }
  };







  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Your Cart</h2>

      {cart.length === 0 && (
        <p className="text-yellow-500">No items in cart 🛒</p>
      )}

      {cart.map((p, i) => (
        <div
          key={i}
          className="flex items-center gap-4 mb-4 p-3 bg-gray-900 rounded-xl shadow-md"
        >
          <img
            src={p.image}
            alt={p.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-yellow-400">
              ${(p.price || 0).toFixed(2)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
              onClick={() => updateQty(i, (p.qty || 1) - 1)}
            >
              -
            </button>
            <div className="w-6 text-center">{p.qty || 1}</div>
            <button
              className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
              onClick={() => updateQty(i, (p.qty || 1) + 1)}
            >
              +
            </button>
          </div>

          <button
            className="ml-4 text-sm text-red-400 hover:underline"
            onClick={() => removeItem(i)}
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <p className="mt-4 text-lg font-semibold text-yellow-400">
            Total: ${total.toFixed(2)}
          </p>

          <hr className="my-4 border-gray-700" />

          <h3 className="text-lg font-bold mb-2 text-yellow-400">
            Contact & Delivery
          </h3>

          <label className="block mb-3">
            <span className="text-sm text-gray-300">Email</span>
            <input
              className="mt-1 block w-full rounded-lg bg-gray-800 text-white border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="block mb-3">
            <span className="text-sm text-gray-300">Address</span>
            <textarea
              className="mt-1 block w-full rounded-lg bg-gray-800 text-white border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, city, postal code"
            />
          </label>

          <div className="flex gap-2 items-start mb-3">
            <select
              className="rounded-lg bg-gray-800 text-white border border-gray-600 px-3 py-2 focus:ring focus:ring-yellow-400"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {COUNTRY_OPTIONS.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.label} ({c.dial})
                </option>
              ))}
            </select>

            <input
              className="flex-1 rounded-lg bg-gray-800 text-white border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="345-1234567"
            />
          </div>

          <button
            onClick={placeOrder}
            className="mt-4 w-full bg-yellow-400 text-black font-semibold py-3 rounded-xl shadow hover:bg-yellow-500 transition"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );



}
