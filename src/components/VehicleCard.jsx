import { formatCurrency } from "../utils/storage.js";

const vehicleMeta = {
  Car: { tollClass: "Car / Jeep / Van", example: "Sedan / SUV", axles: "Light Motor Vehicle", image: "/vehicle-types/car.jpg" },
  Jeep: { tollClass: "Light Commercial Vehicle", example: "SUV / Utility Vehicle", axles: "LCV class", image: "/vehicle-types/jeep.jpg" },
  Van: { tollClass: "Light Commercial Vehicle", example: "Tempo Traveller / Van", axles: "LCV class", image: "/vehicle-types/van.jpg" },
  Bus: { tollClass: "Bus / Truck", example: "KSRTC / Volvo-style Bus", axles: "2 Axle", image: "/vehicle-types/bus.jpg" },
  Truck: { tollClass: "Bus / Truck", example: "Cargo Truck", axles: "2 Axle", image: "/vehicle-types/truck.jpg" },
  "Heavy Vehicle": { tollClass: "Multi Axle Vehicle", example: "Container / Heavy Goods Vehicle", axles: "3-6 Axle", image: "/vehicle-types/heavy-vehicle.jpg" },
};

export default function VehicleCard({ type, rate, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(type)}
      className={`overflow-hidden rounded border text-left shadow-sm transition ${
        selected ? "border-amber-500 bg-amber-50 ring-2 ring-amber-300" : "border-slate-200 bg-white hover:border-slate-400"
      }`}
    >
      <div className="relative h-32 overflow-hidden bg-slate-200">
        <img src={vehicleMeta[type].image} alt={`${type} vehicle`} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <span className="rounded bg-white/90 px-2 py-1 text-xs font-black uppercase tracking-wide text-slate-950">{vehicleMeta[type].tollClass}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">{type}</p>
            <p className="mt-1 text-sm font-bold text-slate-600">{vehicleMeta[type].example}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{vehicleMeta[type].axles}</p>
          </div>
          <p className="rounded bg-slate-100 px-3 py-2 text-sm font-black text-slate-950">{formatCurrency(rate)}</p>
        </div>
      </div>
    </button>
  );
}
