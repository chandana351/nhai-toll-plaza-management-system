import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tollPlazas, tollRates, vehicleTypes } from "../data/tollData.js";
import { formatCurrency } from "../utils/storage.js";

const vehiclePattern = /^[A-Z]{2}[0-9]{2}([A-Z]{1,2})?[0-9]{4}$/;

const vehicleClassMeta = {
  Car: { label: "Car", className: "Car / Jeep / Van", image: "/vehicle-types/car.jpg" },
  Jeep: { label: "LCV", className: "Light Commercial Vehicle", image: "/vehicle-types/jeep.jpg" },
  Van: { label: "Van", className: "Light Commercial Vehicle", image: "/vehicle-types/van.jpg" },
  Bus: { label: "Bus / Truck", className: "Bus / Truck", image: "/vehicle-types/bus.jpg" },
  Truck: { label: "3 AXEL", className: "Goods Vehicle", image: "/vehicle-types/truck.jpg" },
  "Heavy Vehicle": { label: "4-6 AXEL", className: "Multi Axle Vehicle", image: "/vehicle-types/heavy-vehicle.jpg" },
};

export default function CollectToll() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const defaultPlaza = params.get("plaza") || tollPlazas[0].id;
  const [plazaId, setPlazaId] = useState(defaultPlaza);
  const [vehicleNumber, setVehicleNumber] = useState("KA01AB1234");
  const [vehicleType, setVehicleType] = useState("Car");
  const [laneNumber, setLaneNumber] = useState("Lane 1");
  const [paymentMode, setPaymentMode] = useState("FASTag");
  const [passId, setPassId] = useState("123456");
  const [description, setDescription] = useState("");
  const [fareType, setFareType] = useState("Single");
  const [penalty, setPenalty] = useState("0");
  const [overloaded, setOverloaded] = useState(false);
  const [error, setError] = useState("");

  const plaza = useMemo(() => tollPlazas.find((item) => item.id === plazaId) || tollPlazas[0], [plazaId]);
  const lanes = Array.from({ length: plaza.lanes }, (_, index) => `Lane ${index + 1}`);
  const baseAmount = tollRates[vehicleType];
  const fareMultiplier = fareType === "Double" ? 2 : 1;
  const penaltyAmount = Number(penalty || 0);
  const overloadPenalty = overloaded ? 500 : 0;
  const amount = baseAmount * fareMultiplier + penaltyAmount + overloadPenalty;
  const now = new Date();

  function continuePayment(event) {
    event.preventDefault();
    const cleanNumber = vehicleNumber.replace(/\s+/g, "").toUpperCase();
    if (!vehiclePattern.test(cleanNumber)) {
      setError("Enter a valid Indian vehicle number, for example KA01AB1234 or MH051234.");
      return;
    }

    const query = new URLSearchParams({ plazaId, vehicleNumber: cleanNumber, vehicleType, laneNumber, amount: String(amount) });
    navigate(paymentMode === "FASTag" ? `/fastag?${query}` : `/manual-payment?${query}&paymentMode=${paymentMode}`);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <form onSubmit={continuePayment} className="rounded border border-slate-300 bg-[#eef3f8] p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-300 pb-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">Toll Collection Software</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">Vehicle Registration</h1>
          </div>
          <div className="text-sm font-bold text-slate-600 lg:text-right">
            <p>User: Operator</p>
            <p>{plaza.name} - {plaza.highway}</p>
          </div>
        </div>

        <section className="mt-5">
          <p className="font-black text-slate-800">Select Vehicle Class</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {vehicleTypes.map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setVehicleType(type)}
                className={`rounded border bg-white p-2 text-center shadow-sm transition ${
                  vehicleType === type ? "border-amber-500 ring-2 ring-amber-300" : "border-slate-300 hover:border-slate-500"
                }`}
              >
                <img src={vehicleClassMeta[type].image} alt={`${type} class`} className="h-20 w-full rounded object-cover" />
                <p className="mt-2 text-sm font-black text-slate-950">{vehicleClassMeta[type].label}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4">
            <label className="grid gap-2 font-bold text-slate-700">
              Toll Plaza
              <select value={plazaId} onChange={(event) => setPlazaId(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold">
                {tollPlazas.map((item) => <option key={item.id} value={item.id}>{item.name} - {item.state} - {item.highway}</option>)}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 font-bold text-slate-700">
                Registration No.
                <input value={vehicleNumber} onChange={(event) => setVehicleNumber(event.target.value.toUpperCase())} className="rounded border border-slate-300 px-4 py-3 font-black tracking-wider" placeholder="MH051234" />
              </label>
              <label className="grid gap-2 font-bold text-slate-700">
                Pass ID
                <input value={passId} onChange={(event) => setPassId(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold" placeholder="123456" />
              </label>
            </div>

            <label className="grid gap-2 font-bold text-slate-700">
              Description
              <input value={description} onChange={(event) => setDescription(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold" placeholder="Operator note or vehicle remark" />
            </label>
          </div>

          <aside className="rounded border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Fare Details</h2>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 font-bold text-slate-700">
                  Lane Number
                  <select value={laneNumber} onChange={(event) => setLaneNumber(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold">
                    {lanes.map((lane) => <option key={lane}>{lane}</option>)}
                  </select>
                </label>
                <label className="grid gap-2 font-bold text-slate-700">
                  Fare Type
                  <select value={fareType} onChange={(event) => setFareType(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold">
                    <option>Single</option>
                    <option>Double</option>
                  </select>
                </label>
              </div>

              <div>
                <p className="font-bold text-slate-700">Mode of Payment</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {["FASTag", "UPI", "Cash"].map((mode) => (
                    <button key={mode} type="button" onClick={() => setPaymentMode(mode)} className={`rounded border px-3 py-3 font-black ${paymentMode === mode ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white text-slate-700"}`}>
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 font-bold text-slate-700">
                  Penalty
                  <input value={penalty} onChange={(event) => setPenalty(event.target.value)} type="number" min="0" className="rounded border border-slate-300 px-4 py-3 font-semibold" />
                </label>
                <label className="flex items-center gap-3 rounded border border-slate-300 px-4 py-3 font-bold text-slate-700">
                  <input checked={overloaded} onChange={(event) => setOverloaded(event.target.checked)} type="checkbox" className="h-5 w-5 accent-amber-500" />
                  Is vehicle overloaded?
                </label>
              </div>

              <div className="rounded border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-3 text-sm">
                  <p className="font-bold text-slate-500">TC Class: <span className="font-black text-slate-950">{vehicleClassMeta[vehicleType].className}</span></p>
                  <p className="font-bold text-slate-500">Selected Vehicle: <span className="font-black text-slate-950">{vehicleType}</span></p>
                  <p className="font-bold text-slate-500">Mode of Payment: <span className="font-black text-slate-950">{paymentMode}</span></p>
                  <p className="font-bold text-slate-500">TC Amount: <span className="font-black text-slate-950">{formatCurrency(baseAmount * fareMultiplier)}</span></p>
                  <p className="font-bold text-slate-500">Total Amount: <span className="font-black text-emerald-700">{formatCurrency(amount)}</span></p>
                </div>
              </div>

              {error && <p className="rounded bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}

              <button className="rounded bg-amber-400 px-6 py-4 text-lg font-black text-slate-950 hover:bg-amber-300">
                Register and Continue
              </button>
            </div>
          </aside>
        </section>

        <footer className="mt-6 flex flex-col justify-between gap-2 border-t border-slate-300 pt-4 text-sm font-bold text-slate-600 sm:flex-row">
          <p>Shift Remaining Time: 04:33</p>
          <p>Date: {now.toLocaleDateString("en-IN")} | Time: {now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
        </footer>
      </form>
    </section>
  );
}
