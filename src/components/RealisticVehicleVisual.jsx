const vehicleProfiles = {
  Car: {
    body: "from-red-700 via-red-600 to-red-800",
    roof: "bg-red-500",
    glass: "from-slate-700 to-slate-950",
    width: "w-48",
    height: "h-20",
    wheels: "left-8 right-8",
  },
  Jeep: {
    body: "from-emerald-800 via-emerald-700 to-emerald-950",
    roof: "bg-emerald-700",
    glass: "from-slate-700 to-slate-950",
    width: "w-52",
    height: "h-24",
    wheels: "left-9 right-9",
  },
  Van: {
    body: "from-slate-200 via-white to-slate-300",
    roof: "bg-slate-100",
    glass: "from-sky-600 to-slate-900",
    width: "w-56",
    height: "h-24",
    wheels: "left-10 right-10",
  },
  Bus: {
    body: "from-yellow-500 via-amber-400 to-yellow-600",
    roof: "bg-yellow-300",
    glass: "from-sky-700 to-slate-900",
    width: "w-64",
    height: "h-28",
    wheels: "left-12 right-12",
  },
  Truck: {
    body: "from-blue-800 via-blue-700 to-blue-950",
    roof: "bg-blue-700",
    glass: "from-slate-700 to-slate-950",
    width: "w-64",
    height: "h-28",
    wheels: "left-14 right-10",
  },
  "Heavy Vehicle": {
    body: "from-zinc-700 via-zinc-600 to-zinc-900",
    roof: "bg-zinc-600",
    glass: "from-slate-700 to-slate-950",
    width: "w-72",
    height: "h-32",
    wheels: "left-16 right-12",
  },
};

export default function RealisticVehicleVisual({ type, plateNumber = "KA01AB1234", compact = false }) {
  const profile = vehicleProfiles[type] || vehicleProfiles.Car;

  return (
    <div className={`relative grid place-items-center overflow-hidden rounded bg-gradient-to-b from-slate-600 to-slate-950 ${compact ? "h-32" : "h-64"}`}>
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute left-4 top-4 rounded bg-black/45 px-3 py-1 text-xs font-black uppercase tracking-widest text-emerald-300">Lane Cam</div>
      <div className="absolute bottom-0 h-12 w-full bg-slate-800">
        <div className="mx-auto mt-5 h-1 w-4/5 bg-amber-300" />
      </div>

      <div className={`relative ${profile.width} ${compact ? "scale-75" : ""}`}>
        <div className={`mx-auto mb-[-6px] h-12 w-3/5 rounded-t-2xl ${profile.roof} shadow-lg`}>
          <div className={`mx-auto h-9 w-4/5 rounded-b-xl bg-gradient-to-b ${profile.glass}`} />
        </div>
        <div className={`relative mx-auto ${profile.width} ${profile.height} rounded-t-3xl rounded-b-lg bg-gradient-to-r ${profile.body} shadow-2xl`}>
          <div className="absolute left-5 top-4 h-5 w-10 rounded bg-gradient-to-r from-slate-800 to-sky-900" />
          <div className="absolute right-5 top-4 h-5 w-10 rounded bg-gradient-to-r from-sky-900 to-slate-800" />
          <div className="absolute left-3 top-1/2 h-4 w-4 rounded-full bg-yellow-100 shadow-[0_0_18px_rgba(254,240,138,.9)]" />
          <div className="absolute right-3 top-1/2 h-4 w-4 rounded-full bg-yellow-100 shadow-[0_0_18px_rgba(254,240,138,.9)]" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded border-2 border-black bg-white px-3 py-1 text-sm font-black tracking-wider text-slate-950 shadow">
            {plateNumber}
          </div>
        </div>
        <div className={`absolute -bottom-4 ${profile.wheels}`}>
          <div className="flex justify-between">
            <div className="h-9 w-9 rounded-full border-4 border-slate-950 bg-zinc-700 shadow" />
            <div className="h-9 w-9 rounded-full border-4 border-slate-950 bg-zinc-700 shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}
