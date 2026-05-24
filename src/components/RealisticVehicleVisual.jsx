const vehicleProfiles = {
  Car: {
    body: "from-slate-200 via-white to-slate-400",
    accent: "from-zinc-900 via-slate-700 to-zinc-950",
    plateTop: "top-[58%]",
    shape: "rounded-t-[3rem] rounded-b-2xl",
  },
  Jeep: {
    body: "from-emerald-900 via-emerald-700 to-emerald-950",
    accent: "from-black via-zinc-700 to-black",
    plateTop: "top-[61%]",
    shape: "rounded-t-2xl rounded-b-xl",
  },
  Van: {
    body: "from-zinc-100 via-white to-zinc-300",
    accent: "from-slate-950 via-slate-600 to-slate-950",
    plateTop: "top-[62%]",
    shape: "rounded-t-3xl rounded-b-lg",
  },
  Bus: {
    body: "from-amber-500 via-yellow-400 to-amber-600",
    accent: "from-slate-900 via-slate-600 to-slate-900",
    plateTop: "top-[66%]",
    shape: "rounded-t-xl rounded-b-lg",
  },
  Truck: {
    body: "from-blue-900 via-blue-700 to-blue-950",
    accent: "from-zinc-950 via-zinc-700 to-zinc-950",
    plateTop: "top-[65%]",
    shape: "rounded-t-lg rounded-b-lg",
  },
  "Heavy Vehicle": {
    body: "from-stone-700 via-zinc-500 to-stone-900",
    accent: "from-black via-zinc-600 to-black",
    plateTop: "top-[66%]",
    shape: "rounded-t-lg rounded-b-lg",
  },
};

export default function RealisticVehicleVisual({ type, plateNumber = "KA01AB1234", compact = false }) {
  const profile = vehicleProfiles[type] || vehicleProfiles.Car;

  return (
    <div className={`relative grid place-items-center overflow-hidden rounded bg-gradient-to-b from-slate-300 via-slate-600 to-slate-950 ${compact ? "h-32" : "h-64"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.32),transparent_42%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(255,255,255,.11)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="absolute left-4 top-4 rounded bg-black/55 px-3 py-1 text-xs font-black uppercase tracking-widest text-emerald-300">ANPR Cam</div>
      <div className="absolute right-4 top-4 rounded bg-black/55 px-3 py-1 text-xs font-black uppercase tracking-widest text-white">IND</div>
      <div className="absolute bottom-0 h-16 w-full bg-gradient-to-b from-slate-700 to-slate-950">
        <div className="mx-auto mt-7 h-1 w-4/5 bg-amber-300" />
      </div>

      <div className={`relative ${compact ? "scale-[.58]" : "scale-100"} h-56 w-[27rem]`}>
        <div className={`absolute left-1/2 top-5 h-36 w-80 -translate-x-1/2 bg-gradient-to-r ${profile.body} ${profile.shape} shadow-2xl`}>
          <div className="absolute left-1/2 top-4 h-16 w-52 -translate-x-1/2 rounded-t-[2rem] rounded-b-lg bg-gradient-to-b from-slate-950 via-slate-800 to-sky-950 shadow-inner">
            <div className="absolute inset-x-5 top-2 h-2 rounded bg-white/25" />
          </div>
          <div className="absolute left-9 top-24 h-8 w-20 skew-x-[-10deg] rounded bg-gradient-to-r from-yellow-100 via-white to-yellow-200 shadow-[0_0_22px_rgba(254,240,138,.8)]" />
          <div className="absolute right-9 top-24 h-8 w-20 skew-x-[10deg] rounded bg-gradient-to-r from-yellow-200 via-white to-yellow-100 shadow-[0_0_22px_rgba(254,240,138,.8)]" />
          <div className={`absolute left-1/2 ${profile.plateTop} h-10 w-44 -translate-x-1/2 rounded border-2 border-zinc-800 bg-white shadow-lg`}>
            <div className="absolute left-2 top-1 grid h-8 w-8 place-items-center rounded-sm bg-blue-700 text-[8px] font-black leading-none text-white">
              <span>IND</span>
            </div>
            <div className="pl-12 pt-1 text-center text-xl font-black tracking-widest text-zinc-950">{plateNumber}</div>
          </div>
          <div className={`absolute bottom-3 left-1/2 h-8 w-48 -translate-x-1/2 rounded bg-gradient-to-r ${profile.accent}`}>
            <div className="grid h-full grid-cols-6 gap-1 px-3 py-1">
              {Array.from({ length: 6 }).map((_, index) => (
                <span key={index} className="rounded bg-zinc-400/45" />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-9 left-10 h-16 w-16 rounded-full border-[10px] border-zinc-950 bg-zinc-600 shadow-xl" />
        <div className="absolute bottom-9 right-10 h-16 w-16 rounded-full border-[10px] border-zinc-950 bg-zinc-600 shadow-xl" />
        <div className="absolute left-1/2 top-3 h-44 w-96 -translate-x-1/2 rounded-[3rem] border border-white/20 bg-white/10 blur-[1px]" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black/65 px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
          Toll camera capture
        </div>
      </div>
    </div>
  );
}
