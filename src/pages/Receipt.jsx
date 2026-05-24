import { Link, useParams } from "react-router-dom";
import ReceiptView from "../components/ReceiptView.jsx";
import { downloadReceipt } from "../utils/receipt.js";
import { findTransaction } from "../utils/storage.js";

export default function Receipt() {
  const { transactionId } = useParams();
  const transaction = findTransaction(transactionId);

  if (!transaction) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-slate-950">Receipt not found</h1>
        <Link to="/collect" className="mt-5 inline-block rounded bg-slate-950 px-5 py-3 font-black text-white">Create New Toll Entry</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">Receipt Page</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">Toll Bill Generated</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => downloadReceipt(transaction)} className="rounded bg-amber-400 px-4 py-3 font-black text-slate-950 hover:bg-amber-300">Download Bill</button>
          <button onClick={() => window.print()} className="rounded border border-slate-300 bg-white px-4 py-3 font-black text-slate-950 hover:bg-slate-50">Print</button>
        </div>
      </div>
      <ReceiptView transaction={transaction} />
    </section>
  );
}
