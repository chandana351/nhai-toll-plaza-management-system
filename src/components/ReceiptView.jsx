import { formatCurrency, formatDateTime } from "../utils/storage.js";

export default function ReceiptView({ transaction }) {
  const rows = [
    ["NHAI Toll Plaza", transaction.plazaName],
    ["State", transaction.state],
    ["Highway Number", transaction.highway],
    ["Vehicle Number", transaction.vehicleNumber],
    ["Vehicle Type", transaction.vehicleType],
    ["Toll Amount", formatCurrency(transaction.amount)],
    ["Payment Mode", transaction.paymentMode],
    ["Date & Time", formatDateTime(transaction.createdAt)],
    ["Transaction ID", transaction.transactionId],
    ["Lane Number", transaction.laneNumber],
  ];

  return (
    <section id="printable-receipt" className="receipt-paper rounded border-4 border-dashed border-slate-300 bg-white p-6 shadow-sm">
      <div className="border-b border-slate-200 pb-5">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">Payment Receipt</p>
        <h1 className="mt-1 text-2xl font-black text-slate-950">NHAI Toll Plaza</h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">Valid toll payment acknowledgement</p>
      </div>
      <dl className="mt-5 divide-y divide-slate-200">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-2">
            <dt className="text-sm font-bold text-slate-500">{label}</dt>
            <dd className="font-black text-slate-950 sm:text-right">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 rounded bg-emerald-100 px-4 py-3 text-center font-black text-emerald-800">PAID</div>
    </section>
  );
}
