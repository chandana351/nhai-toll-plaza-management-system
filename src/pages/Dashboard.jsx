import { useMemo, useState } from "react";
import PlazaCard from "../components/PlazaCard.jsx";
import StatCard from "../components/StatCard.jsx";
import { states, tollPlazas } from "../data/tollData.js";
import { formatCurrency, getTransactions } from "../utils/storage.js";

export default function Dashboard() {
  const [state, setState] = useState("All");
  const [highway, setHighway] = useState("All");
  const [query, setQuery] = useState("");
  const transactions = getTransactions();

  const highways = useMemo(() => ["All", ...new Set(tollPlazas.map((plaza) => plaza.highway))], []);
  const filtered = tollPlazas.filter((plaza) => {
    const text = `${plaza.name} ${plaza.city} ${plaza.state} ${plaza.highway}`.toLowerCase();
    return (state === "All" || plaza.state === state) && (highway === "All" || plaza.highway === highway) && text.includes(query.toLowerCase());
  });

  const totalRevenue = transactions.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">All India Network</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">Toll Plaza Dashboard</h1>
          <p className="mt-2 max-w-2xl font-semibold text-slate-500">Filter toll booths by state, city, and highway before opening the correct toll counter.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:w-[620px]">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search city, state, highway" className="rounded border border-slate-300 px-4 py-3 font-semibold outline-none focus:border-amber-500" />
          <select value={state} onChange={(event) => setState(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold outline-none focus:border-amber-500">
            <option>All</option>
            {states.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={highway} onChange={(event) => setHighway(event.target.value)} className="rounded border border-slate-300 px-4 py-3 font-semibold outline-none focus:border-amber-500">
            {highways.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Total Toll Plazas" value={tollPlazas.length} />
        <StatCard label="Total Vehicles Today" value={transactions.length} tone="blue" />
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} tone="green" />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((plaza) => <PlazaCard key={plaza.id} plaza={plaza} />)}
      </div>
    </section>
  );
}
