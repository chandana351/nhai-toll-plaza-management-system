import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tollPlazas } from "../data/tollData.js";
import { buildTransaction, formatCurrency, saveTransaction } from "../utils/storage.js";

export default function FastagScanner() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const plaza = useMemo(() => tollPlazas.find((item) => item.id === params.get("plazaId")) || tollPlazas[0], [params]);
  const amount = Number(params.get("amount") || 0);

  function completeFastag() {
    setProcessing(true);
    window.setTimeout(() => {
      const transaction = buildTransaction({
        plaza,
        vehicleNumber: params.get("vehicleNumber"),
        vehicleType: params.get("vehicleType"),
        laneNumber: params.get("laneNumber"),
        paymentMode: "FASTag",
        amount,
      });
      saveTransaction(transaction);
      navigate(`/receipt/${transaction.transactionId}`);
    }, 700);
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">FASTag Payment Simulation</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950">FASTag Scanner Page</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <div className="rounded bg-slate-950 p-6 text-white">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Lane RFID Reader</p>
            <div className="mt-5 rounded border border-dashed border-amber-300 p-8 text-center">
              <p className="text-6xl font-black">{scanned ? "OK" : "RF"}</p>
              <p className="mt-3 font-bold text-slate-300">{scanned ? "FASTag verified. Balance debited." : "Position vehicle near scanner"}</p>
            </div>
          </div>
          <button type="button" onClick={() => setScanned(true)} className="mt-5 w-full rounded border border-slate-300 bg-white px-5 py-3 font-black text-slate-950 hover:bg-slate-50">
            Simulate FASTag Scan
          </button>
          <button type="button" disabled={!scanned || processing} onClick={completeFastag} className="mt-3 w-full rounded bg-emerald-600 px-5 py-4 font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300">
            {processing ? "Processing Payment..." : "Confirm FASTag Payment"}
          </button>
        </div>
        <aside className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Vehicle Entry</h2>
          <dl className="mt-5 grid gap-4">
            {[
              ["Plaza", plaza.name],
              ["State", plaza.state],
              ["Highway", plaza.highway],
              ["Vehicle", params.get("vehicleNumber")],
              ["Type", params.get("vehicleType")],
              ["Lane", params.get("laneNumber")],
              ["Amount", formatCurrency(amount)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="font-bold text-slate-500">{label}</dt>
                <dd className="text-right font-black text-slate-950">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
