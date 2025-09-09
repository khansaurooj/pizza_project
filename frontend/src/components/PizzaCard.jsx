

export default function PizzaCard({ pizza, onAdd }) {
  return (
    <div className="card p-3 flex flex-col">
      {/* Image area: blurred background (fills) + centered full image (no crop) */}
      <div className="w-full h-56 relative rounded-xl overflow-hidden bg-gray-100">
        {/* background (fills box, may be cropped but blurred) */}
        <img
          src={pizza.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
        />

        {/* foreground image (shows full image, centered, largest possible without crop) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="max-w-[92%] max-h-[92%] object-contain rounded-lg"
          />
        </div>

        {/* optional subtle overlay for contrast (uncomment if needed) */}
        {/* <div className="absolute inset-0 bg-black/5 z-20" /> */}
      </div>

      <div className="mt-3 flex-1">
        <h2 className="text-lg font-semibold">{pizza.name}</h2>
        <p className="text-gray-500 mt-1 text-sm">{pizza.tags?.join(", ")}</p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold">${pizza.price}</span>
        <button className="btn btn-primary" onClick={() => onAdd?.(pizza)}>
          Add
        </button>
      </div>
    </div>
  );
}
