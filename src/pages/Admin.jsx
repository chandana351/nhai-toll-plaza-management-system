import StatCard from "../components/StatCard.jsx";
import { tollPlazas } from "../data/tollData.js";
import { formatCurrency, formatDateTime, getTransactions } from "../utils/storage.js";

export default function Admin() {
  const transactions = getTransactions();
  const revenue = transactions.reduce((sum, item) => sum + item.amount, 0);
  const fastag = transactions.filter((item) => item.paymentMode === "FASTag");
  const cash = transactions.filter((item) => item.paymentMode === "Cash");
  const upi = transactions.filter((item) => item.paymentMode === "UPI");
  const latest = transactions.slice(0, 8);

  const byState = tollPlazas.reduce((acc, plaza) => {
    acc[plaza.state] = (acc[plaza.state] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">Admin Dashboard</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950">Operations Control Room</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Toll Plazas" value={tollPlazas.length} />
        <StatCard label="Total Vehicles Today" value={transactions.length} tone="blue" />
        <StatCard label="Total Revenue" value={formatCurrency(revenue)} tone="green" />
        <StatCard label="FASTag Payments" value={fastag.length} tone="amber" />
        <StatCard label="Cash Payments" value={cash.length} />
        <StatCard label="UPI Payments" value={upi.length} tone="blue" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">State-wise Toll Plazas</h2>
          <div className="mt-5 grid gap-3">
            {Object.entries(byState).map(([state, count]) => (
              <div key={state} className="flex items-center justify-between rounded bg-slate-100 px-4 py-3">
                <span className="font-bold text-slate-700">{state}</span>
                <span className="font-black text-slate-950">{count}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Recent Vehicle History</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-3">Vehicle</th>
                  <th className="px-3 py-3">Plaza</th>
                  <th className="px-3 py-3">Mode</th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {latest.map((item) => (
                  <tr key={item.transactionId}>
                    <td className="px-3 py-3 font-black text-slate-950">{item.vehicleNumber}</td>
                    <td className="px-3 py-3 font-semibold text-slate-600">{item.plazaName}</td>
                    <td className="px-3 py-3 font-bold text-slate-700">{item.paymentMode}</td>
                    <td className="px-3 py-3 font-black text-slate-950">{formatCurrency(item.amount)}</td>
                    <td className="px-3 py-3 font-semibold text-slate-500">{formatDateTime(item.createdAt)}</td>
                  </tr>
                ))}
                {!latest.length && (
                  <tr>
                    <td colSpan="5" className="px-3 py-8 text-center font-bold text-slate-500">No toll transactions recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}
