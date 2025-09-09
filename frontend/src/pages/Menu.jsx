
import { useEffect, useState } from 'react'
import { api } from '../api'
import HeroSlider from '../components/HeroSlider'
import PizzaCard from '../components/PizzaCard'


export default function Menu() {
const [pizzas, setPizzas] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')


useEffect(() => {
let ignore = false
api('/menu')
.then(data => { if (!ignore) { setPizzas(data); setLoading(false) } })
.catch(err => { if (!ignore) { setError(err.message); setLoading(false) } })
return () => { ignore = true }
}, [])


const addToCart = (pizza) => {
const cart = JSON.parse(localStorage.getItem('cart') || '[]')
const existing = cart.find(i => i.slug === pizza.slug)

if (existing) {
  existing.qty += 1;
} else {
  cart.push({
    slug: pizza.slug,
    name: pizza.name,
    price: pizza.price,
    image: pizza.image,   // ✅ save image
    qty: 1
  });
}
localStorage.setItem('cart', JSON.stringify(cart))
alert(`${pizza.name} added to cart`)
}


return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
      {/* Hero Banner */}
      <HeroSlider />

      {/* Status Messages */}
      {loading && <div className="text-center text-yellow-400">Loading menu…</div>}
      {error && <div className="text-center text-red-400">{error}</div>}

      {/* Pizza Grid */}
      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {pizzas.map((p) => (
            <PizzaCard key={p.slug} pizza={p} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}



