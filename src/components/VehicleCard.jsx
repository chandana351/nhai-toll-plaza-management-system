import RealisticVehicleVisual from "./RealisticVehicleVisual.jsx";
import { formatCurrency } from "../utils/storage.js";

export default function VehicleCard({ type, rate, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(type)}
      className={`overflow-hidden rounded border text-left shadow-sm transition ${
        selected ? "border-amber-500 bg-amber-50 ring-2 ring-amber-300" : "border-slate-200 bg-white hover:border-slate-400"
      }`}
    >
      <RealisticVehicleVisual type={type} plateNumber="IND TOLL" compact />
      <div className="p-4">
        <p className="font-black text-slate-950">{type}</p>
        <p className="mt-1 text-sm font-bold text-slate-500">{formatCurrency(rate)}</p>
      </div>
    </button>
  );
}
