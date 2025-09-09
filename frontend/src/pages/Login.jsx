
import { useState } from "react";
import { api } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const autoPlacePendingOrder = async (token) => {
    const pending = JSON.parse(localStorage.getItem("pendingOrder") || "null");
    if (!pending) return;
    try {
      await api("/orders", { method: "POST", body: pending, token });
      alert("Pending order placed ✅");
      localStorage.removeItem("pendingOrder");
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Failed to place pending order:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: { email, password },
      });

      localStorage.setItem("token", res.access_token);
      alert("Login successful!");

      await autoPlacePendingOrder(res.access_token);

      const next = localStorage.getItem("nextAfterLogin") || "/menu";
      localStorage.removeItem("nextAfterLogin");
      nav(next);
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-yellow-400">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:ring focus:ring-yellow-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:ring focus:ring-yellow-400"
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-500 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
