import { useState } from "react";
import { api } from "../api";

export default function Feedback() {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api("/feedback", {
        method: "POST",
        body: { message, rating },
      });
      setStatus("success");
      setMessage("");
      setRating(5);
    } catch (err) {
      setStatus("error:" + (err.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-yellow-400">
          Your Feedback
        </h1>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:ring focus:ring-yellow-400"
          rows={4}
          required
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:ring focus:ring-yellow-400"
        >
          <option value={5}>⭐️⭐️⭐️⭐️⭐️ Excellent</option>
          <option value={4}>⭐️⭐️⭐️⭐️ Good</option>
          <option value={3}>⭐️⭐️⭐️ Average</option>
          <option value={2}>⭐️⭐️ Poor</option>
          <option value={1}>⭐️ Very Poor</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
        >
          Submit Feedback
        </button>

        {status && (
          <p
            className={`mt-4 text-center font-medium ${
              status.startsWith("success")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {status.startsWith("success")
              ? "✅ Thank you for your feedback!"
              : status.replace("error:", "❌ ")}
          </p>
        )}
      </form>
    </div>
  );
}
