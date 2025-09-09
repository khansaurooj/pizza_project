export default function FAQ() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl text-center font-bold text-yellow-400 mb-6">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl  text-yellow-300">How do I place an order?</h2>
          <p className="text-gray-300">Browse our menu, add items to your cart, then proceed to checkout.</p>
        </div>
        <div>
          <h2 className="text-xl  text-yellow-300">Do you offer delivery?</h2>
          <p className="text-gray-300">Yes! We deliver within the city limits within 30-45 minutes.</p>
        </div>
        <div>
          <h2 className="text-xl  text-yellow-300">What payment methods are accepted?</h2>
          <p className="text-gray-300">We accept Cash on Delivery and all major debit/credit cards.</p>
        </div>
      </div>
    </div>
  );
}
