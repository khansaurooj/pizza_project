export default function Footer() {
  return (
    <footer className="border-t bg-black text-gray-300">
      <div className="container py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold text-yellow-400">Pizzario</h2>
          <p className="mt-2 text-sm text-gray-400">
            Delicious pizzas made fresh every day. Order online & enjoy at home!
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold text-yellow-400">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="/menu" className="hover:text-yellow-400">Menu</a></li>
            <li><a href="/cart" className="hover:text-yellow-400">Cart</a></li>
            <li><a href="/login" className="hover:text-yellow-400">Login</a></li>
            <li><a href="/register" className="hover:text-yellow-400">Register</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold text-yellow-400">Support</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="/contact" className="hover:text-yellow-400">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-yellow-400">FAQ</a></li>
            <li><a href="/feedback" className="hover:text-yellow-400">Feedback</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold text-yellow-400">Follow Us</h3>
          <div className="mt-2 flex gap-4">
            <a href="/contact" className="hover:text-yellow-400">contact_email</a>
            
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-xs text-yellow-500">
        © {new Date().getFullYear()} Pizzario. All rights reserved.
      </div>
    </footer>
  );
}
