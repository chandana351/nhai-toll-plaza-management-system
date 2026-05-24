import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tollPlazas } from "../data/tollData.js";
import { buildTransaction, formatCurrency, saveTransaction } from "../utils/storage.js";

export default function ManualPayment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [reference, setReference] = useState("");
  const plaza = useMemo(() => tollPlazas.find((item) => item.id === params.get("plazaId")) || tollPlazas[0], [params]);
  const paymentMode = params.get("paymentMode") || "Cash";
  const amount = Number(params.get("amount") || 0);

  function completePayment(event) {
    event.preventDefault();
    const transaction = buildTransaction({
      plaza,
      vehicleNumber: params.get("vehicleNumber"),
      vehicleType: params.get("vehicleType"),
      laneNumber: params.get("laneNumber"),
      paymentMode,
      amount,
    });
    saveTransaction({ ...transaction, reference: reference || `${paymentMode}-${transaction.transactionId.slice(-6)}` });
    navigate(`/receipt/${transaction.transactionId}`);
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">Manual Counter</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950">Manual Payment Page</h1>
      <form onSubmit={completePayment} className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">{paymentMode} Collection</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            {paymentMode === "UPI" ? "Record UPI reference after customer confirms payment." : "Collect cash and generate official toll receipt."}
          </p>
          <div className="mt-6 rounded bg-slate-100 p-5 text-center">
            <p className="text-sm font-black uppercase tracking-wide text-slate-500">Amount Payable</p>
            <p className="mt-2 text-5xl font-black text-slate-950">{formatCurrency(amount)}</p>
          </div>
          <label className="mt-5 grid gap-2 font-bold text-slate-700">
            {paymentMode === "UPI" ? "UPI Reference ID" : "Cash Counter Note"}
            <input value={reference} onChange={(event) => setReference(event.target.value)} placeholder={paymentMode === "UPI" ? "UPI123456789" : "Cash received by operator"} className="rounded border border-slate-300 px-4 py-3 font-semibold" />
          </label>
          <button className="mt-5 w-full rounded bg-emerald-600 px-5 py-4 font-black text-white hover:bg-emerald-500">Confirm Payment and Generate Receipt</button>
        </div>
        <aside className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Toll Details</h2>
          <dl className="mt-5 grid gap-4">
            {[
              ["Plaza", plaza.name],
              ["State", plaza.state],
              ["Highway", plaza.highway],
              ["Vehicle", params.get("vehicleNumber")],
              ["Type", params.get("vehicleType")],
              ["Lane", params.get("laneNumber")],
              ["Payment Mode", paymentMode],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="font-bold text-slate-500">{label}</dt>
                <dd className="text-right font-black text-slate-950">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </form>
    </section>
  );
}
