import { Link } from "react-router-dom";
import { tollPlazas } from "../data/tollData.js";
import { getTransactions, formatCurrency } from "../utils/storage.js";
import StatCard from "../components/StatCard.jsx";

export default function Home() {
  const transactions = getTransactions();
  const revenue = transactions.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <section className="highway-hero">
        <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-amber-300">National Highway Toll Operations</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">NHAI Toll Plaza</h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-100">
              A real-world toll gate dashboard for Indian highway plazas with FASTag scanning, manual payments,
              receipt download, admin reporting, and vehicle history stored locally.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard" className="rounded bg-amber-400 px-6 py-3 text-center font-black text-slate-950 hover:bg-amber-300">
                Open All India Dashboard
              </Link>
              <Link to="/collect" className="rounded border border-white/60 px-6 py-3 text-center font-black text-white hover:bg-white/10">
                Start Toll Collection
              </Link>
            </div>
          </div>
          <div className="rounded border border-white/20 bg-white/95 p-5 shadow-2xl">
            <p className="font-black uppercase tracking-wide text-slate-500">Today at a glance</p>
            <div className="mt-4 grid gap-4">
              <StatCard label="Total Toll Plazas" value={tollPlazas.length} />
              <StatCard label="Vehicles Processed" value={transactions.length} tone="blue" />
              <StatCard label="Total Revenue" value={formatCurrency(revenue)} tone="green" />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {["FASTag lane handling", "Cash and UPI counters", "Receipt download for paid toll"].map((item) => (
            <div key={item} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-lg font-black text-slate-950">{item}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">Built for plaza staff workflows across states, highways, lanes, and vehicle classes.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
