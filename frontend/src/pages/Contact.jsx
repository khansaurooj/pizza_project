import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon. ✅");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-lg">
        {/* Title */}
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Contact Us
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-900 p-6 rounded-2xl shadow-lg"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:ring focus:ring-yellow-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:ring focus:ring-yellow-400"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:ring focus:ring-yellow-400"
            rows={5}
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-500 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
