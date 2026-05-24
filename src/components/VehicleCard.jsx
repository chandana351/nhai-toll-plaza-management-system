import { formatCurrency } from "../utils/storage.js";

const vehicleMeta = {
  Car: { className: "LMV", axles: "2 Axle", tone: "bg-sky-50 text-sky-900 border-sky-200" },
  Jeep: { className: "LMV Utility", axles: "2 Axle", tone: "bg-emerald-50 text-emerald-900 border-emerald-200" },
  Van: { className: "Passenger Van", axles: "2 Axle", tone: "bg-indigo-50 text-indigo-900 border-indigo-200" },
  Bus: { className: "Passenger Bus", axles: "2-3 Axle", tone: "bg-amber-50 text-amber-900 border-amber-200" },
  Truck: { className: "Goods Carrier", axles: "3-4 Axle", tone: "bg-blue-50 text-blue-900 border-blue-200" },
  "Heavy Vehicle": { className: "Multi Axle", axles: "5+ Axle", tone: "bg-zinc-100 text-zinc-900 border-zinc-300" },
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
      <div className="p-4">
        <div className={`rounded border px-3 py-3 ${vehicleMeta[type].tone}`}>
          <p className="text-xs font-black uppercase tracking-wider">Vehicle Type</p>
          <p className="mt-2 text-2xl font-black">{type}</p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-slate-950">{vehicleMeta[type].className}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{vehicleMeta[type].axles}</p>
          </div>
          <p className="rounded bg-slate-100 px-3 py-2 text-sm font-black text-slate-950">{formatCurrency(rate)}</p>
        </div>
      </div>
    </button>
  );
}
