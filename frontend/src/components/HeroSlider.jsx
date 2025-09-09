import { useEffect, useState } from "react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1655673654158-9f7285b7d1ea?w=1200&auto=format&fit=crop&q=80",
    title: "Hot & Fresh",
    sub: "Crusty base, melty cheese.",
  },
  {
    img: "https://images.unsplash.com/photo-1703073186159-ae38e1c42dee?w=1200&auto=format&fit=crop&q=80",
    title: "Loaded Toppings",
    sub: "Pick your favorites.",
  },
  {
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&auto=format&fit=crop&q=80",
    title: "Delivered Fast",
    sub: "Right to your door.",
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((prev) => (prev + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border shadow-sm">
      {slides.map((s, idx) => (
        <img
          src={s.img}
          key={idx}
          alt={s.title}
          className={`w-full h-64 md:h-96 lg:h-[500px] object-cover transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />

      {/* Text overlay */}
      <div className="absolute bottom-6 left-6 text-white">
        <h2 className="text-3xl md:text-4xl font-bold drop-shadow">{slides[i].title}</h2>
        <p className="text-base md:text-lg opacity-90">{slides[i].sub}</p>
      </div>
    </div>
  );
}
