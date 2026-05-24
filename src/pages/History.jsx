import { Link } from "react-router-dom";
import { downloadReceipt } from "../utils/receipt.js";
import { clearTransactions, formatCurrency, formatDateTime, getTransactions } from "../utils/storage.js";

export default function History() {
  const transactions = getTransactions();

  function clearAll() {
    if (window.confirm("Clear all local toll transactions?")) {
      clearTransactions();
      window.location.reload();
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">Vehicle History</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">Transaction History</h1>
          <p className="mt-2 font-semibold text-slate-500">Saved in localStorage on this browser.</p>
        </div>
        <button onClick={clearAll} className="rounded border border-red-200 bg-red-50 px-4 py-3 font-black text-red-700 hover:bg-red-100">Clear Local History</button>
      </div>
      <div className="mt-6 overflow-x-auto rounded border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-950 text-xs uppercase tracking-wide text-white">
            <tr>
              <th className="px-4 py-4">Transaction ID</th>
              <th className="px-4 py-4">Vehicle</th>
              <th className="px-4 py-4">Type</th>
              <th className="px-4 py-4">Plaza</th>
              <th className="px-4 py-4">Lane</th>
              <th className="px-4 py-4">Mode</th>
              <th className="px-4 py-4">Amount</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Bill</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((item) => (
              <tr key={item.transactionId} className="align-top">
                <td className="px-4 py-4 font-black text-slate-950">{item.transactionId}</td>
                <td className="px-4 py-4 font-black text-slate-950">{item.vehicleNumber}</td>
                <td className="px-4 py-4 font-semibold text-slate-600">{item.vehicleType}</td>
                <td className="px-4 py-4 font-semibold text-slate-600">{item.plazaName}<br /><span className="text-xs text-slate-400">{item.state} - {item.highway}</span></td>
                <td className="px-4 py-4 font-semibold text-slate-600">{item.laneNumber}</td>
                <td className="px-4 py-4 font-bold text-slate-700">{item.paymentMode}</td>
                <td className="px-4 py-4 font-black text-slate-950">{formatCurrency(item.amount)}</td>
                <td className="px-4 py-4 font-semibold text-slate-500">{formatDateTime(item.createdAt)}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Link to={`/receipt/${item.transactionId}`} className="rounded bg-slate-950 px-3 py-2 font-black text-white">View</Link>
                    <button onClick={() => downloadReceipt(item)} className="rounded bg-amber-400 px-3 py-2 font-black text-slate-950">Download</button>
                  </div>
                </td>
              </tr>
            ))}
            {!transactions.length && (
              <tr>
                <td colSpan="9" className="px-4 py-10 text-center font-bold text-slate-500">No transactions yet. Start from the toll collection page.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
