

// // src/pages/Register.jsx
// import { useState } from "react";
// import { api } from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const nav = useNavigate();

//   const autoPlacePendingOrder = async (token) => {
//     const pending = JSON.parse(localStorage.getItem("pendingOrder") || "null");
//     if (!pending) return;
//     try {
//       await api("/orders", { method: "POST", body: pending, token });
//       alert("Pending order placed ✅");
//       localStorage.removeItem("pendingOrder");
//       localStorage.removeItem("cart");
//     } catch (err) {
//       console.error("Failed to place pending order:", err);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await api("/auth/register", { method: "POST", body: { email, password } });
//       // registration succeeded — now log user in to get token
//       const loginRes = await api("/auth/login", { method: "POST", body: { email, password } });
//       localStorage.setItem("token", loginRes.access_token);
//       await autoPlacePendingOrder(loginRes.access_token);
//       setMessage("Registered and logged in!");
//       const next = localStorage.getItem("nextAfterLogin") || "/menu";
//       localStorage.removeItem("nextAfterLogin");
//       nav(next);
//     } catch (err) {
//       setMessage(err.message || "Something went wrong");
//     }
//   };



//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black">
//       <form
//         onSubmit={handleRegister}
//         className="card w-full max-w-md p-6 space-y-4"
//       >
//         <h2 className="text-2xl font-semibold text-center">Create Account</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="input"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="input"
//         />

//         <button type="submit" className="btn btn-primary w-full">
//           Register
//         </button>

//         {message && (
//           <p className="text-center text-sm text-gray-600">{message}</p>
//         )}

//         <p className="text-sm text-center text-gray-400">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </form>
//     </div>
//   );

// }




// src/pages/Register.jsx
import { useState } from "react";
import { api } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api("/auth/register", {
        method: "POST",
        body: { email, password },
      });

      const loginRes = await api("/auth/login", {
        method: "POST",
        body: { email, password },
      });

      localStorage.setItem("token", loginRes.access_token);
      await autoPlacePendingOrder(loginRes.access_token);

      setMessage("✅ Registered and logged in!");
      const next = localStorage.getItem("nextAfterLogin") || "/menu";
      localStorage.removeItem("nextAfterLogin");
      nav(next);
    } catch (err) {
      setMessage("❌ " + (err.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-yellow-400">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:ring focus:ring-yellow-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:ring focus:ring-yellow-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-500 transition"
        >
          Register
        </button>

        {message && (
          <p
            className={`text-center text-sm ${
              message.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
