import { Link } from "react-router-dom";

export default function PlazaCard({ plaza }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-950">{plaza.name}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">{plaza.city}, {plaza.state}</p>
        </div>
        <span className="rounded bg-amber-100 px-3 py-1 text-sm font-black text-amber-900">{plaza.highway}</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded bg-slate-100 p-3">
          <p className="font-bold text-slate-500">Lanes</p>
          <p className="text-xl font-black text-slate-950">{plaza.lanes}</p>
        </div>
        <div className="rounded bg-slate-100 p-3">
          <p className="font-bold text-slate-500">Mode</p>
          <p className="text-xl font-black text-slate-950">FASTag</p>
        </div>
      </div>
      <Link
        to={`/collect?plaza=${plaza.id}`}
        className="mt-5 block rounded bg-slate-950 px-4 py-3 text-center text-sm font-black text-white hover:bg-slate-800"
      >
        Open Toll Booth
      </Link>
    </article>
  );
}
