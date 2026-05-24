import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import VehicleCard from "../components/VehicleCard.jsx";
import { tollPlazas, tollRates, vehicleTypes } from "../data/tollData.js";
import { formatCurrency } from "../utils/storage.js";

const vehiclePattern = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;

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

  function continuePayment(event) {
    event.preventDefault();
    const cleanNumber = vehicleNumber.replace(/\s+/g, "").toUpperCase();
    if (!vehiclePattern.test(cleanNumber)) {
      setError("Enter a valid Indian vehicle number, for example KA01AB1234.");
      return;
    }

    const query = new URLSearchParams({ plazaId, vehicleNumber: cleanNumber, vehicleType, laneNumber, amount: String(amount) });
    navigate(paymentMode === "FASTag" ? `/fastag?${query}` : `/manual-payment?${query}&paymentMode=${paymentMode}`);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">Vehicle Entry System</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Toll Collection Page</h1>
      </div>
      <form onSubmit={continuePayment} className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Plaza and Lane</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 font-bold text-slate-700">
              Toll Plaza
              <select value={plazaId} onChange={(event) => setPlazaId(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold">
                {tollPlazas.map((item) => <option key={item.id} value={item.id}>{item.name} - {item.state} - {item.highway}</option>)}
              </select>
            </label>
            <label className="grid gap-2 font-bold text-slate-700">
              Registration Number
              <input value={vehicleNumber} onChange={(event) => setVehicleNumber(event.target.value.toUpperCase())} className="rounded border border-slate-300 px-4 py-3 font-black tracking-wider" placeholder="KA01AB1234" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 font-bold text-slate-700">
                Pass ID
                <input value={passId} onChange={(event) => setPassId(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold" placeholder="123456" />
              </label>
              <label className="grid gap-2 font-bold text-slate-700">
                Fare Type
                <select value={fareType} onChange={(event) => setFareType(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold">
                  <option>Single</option>
                  <option>Double</option>
                </select>
              </label>
            </div>
            <label className="grid gap-2 font-bold text-slate-700">
              Description
              <input value={description} onChange={(event) => setDescription(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold" placeholder="Operator note or vehicle remark" />
            </label>
            <label className="grid gap-2 font-bold text-slate-700">
              Lane Number
              <select value={laneNumber} onChange={(event) => setLaneNumber(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold">
                {lanes.map((lane) => <option key={lane}>{lane}</option>)}
              </select>
            </label>
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
            <div>
              <p className="font-bold text-slate-700">Payment Mode</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["FASTag", "UPI", "Cash"].map((mode) => (
                  <button key={mode} type="button" onClick={() => setPaymentMode(mode)} className={`rounded border px-3 py-3 font-black ${paymentMode === mode ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white text-slate-700"}`}>
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <p className="font-bold text-slate-500">TC Class: <span className="font-black text-slate-950">{vehicleType}</span></p>
                <p className="font-bold text-slate-500">Mode of Payment: <span className="font-black text-slate-950">{paymentMode}</span></p>
                <p className="font-bold text-slate-500">TC Amount: <span className="font-black text-slate-950">{formatCurrency(baseAmount * fareMultiplier)}</span></p>
                <p className="font-bold text-slate-500">Total Amount: <span className="font-black text-emerald-700">{formatCurrency(amount)}</span></p>
              </div>
            </div>
            {error && <p className="rounded bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
          </div>
        </div>
        <div>
          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-black text-slate-950">Vehicle Type</h2>
                <p className="text-sm font-semibold text-slate-500">{plaza.name}, {plaza.state} - {plaza.highway}</p>
              </div>
              <p className="rounded bg-amber-100 px-4 py-2 text-xl font-black text-amber-950">{formatCurrency(amount)}</p>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {vehicleTypes.map((type) => <VehicleCard key={type} type={type} rate={tollRates[type]} selected={vehicleType === type} onSelect={setVehicleType} />)}
            </div>
          </div>
          <button className="mt-5 w-full rounded bg-amber-400 px-6 py-4 text-lg font-black text-slate-950 hover:bg-amber-300">
            Continue to {paymentMode === "FASTag" ? "FASTag Scanner" : `${paymentMode} Payment`}
          </button>
        </div>
      </form>
    </section>
  );
}
