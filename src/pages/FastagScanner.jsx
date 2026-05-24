import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RealisticVehicleVisual from "../components/RealisticVehicleVisual.jsx";
import { tollPlazas } from "../data/tollData.js";
import { captureRandomVehicle, getRandomCaptureImage } from "../utils/randomVehicle.js";
import { buildTransaction, formatCurrency, formatDateTime, saveTransaction } from "../utils/storage.js";

export default function FastagScanner() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const plaza = useMemo(() => tollPlazas.find((item) => item.id === params.get("plazaId")) || tollPlazas[0], [params]);
  const [capturedVehicle, setCapturedVehicle] = useState({
    vehicleNumber: params.get("vehicleNumber"),
    vehicleType: params.get("vehicleType"),
    laneNumber: params.get("laneNumber"),
    amount: Number(params.get("amount") || 0),
    confidence: "Manual entry",
    capturedAt: new Date().toISOString(),
    imageSrc: getRandomCaptureImage(params.get("vehicleType")),
  });

  function simulateCameraCapture() {
    setCapturedVehicle(captureRandomVehicle(plaza));
    setScanned(false);
  }

  function completeFastag() {
    setProcessing(true);
    window.setTimeout(() => {
      const transaction = buildTransaction({
        plaza,
        vehicleNumber: capturedVehicle.vehicleNumber,
        vehicleType: capturedVehicle.vehicleType,
        laneNumber: capturedVehicle.laneNumber,
        paymentMode: "FASTag",
        amount: capturedVehicle.amount,
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
          <div className="mb-5 overflow-hidden rounded border border-slate-200 bg-slate-100">
            <RealisticVehicleVisual type={capturedVehicle.vehicleType} plateNumber={capturedVehicle.vehicleNumber} imageSrc={capturedVehicle.imageSrc} />
            <div className="grid gap-3 bg-white p-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Camera Plate</p>
                <p className="mt-1 text-xl font-black text-slate-950">{capturedVehicle.vehicleNumber}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Detected Type</p>
                <p className="mt-1 text-xl font-black text-slate-950">{capturedVehicle.vehicleType}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Confidence</p>
                <p className="mt-1 text-xl font-black text-emerald-700">{capturedVehicle.confidence}</p>
              </div>
            </div>
          </div>
          <div className="rounded bg-slate-950 p-6 text-white">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Lane RFID Reader</p>
            <div className="mt-5 rounded border border-dashed border-amber-300 p-8 text-center">
              <p className="text-6xl font-black">{scanned ? "OK" : "RF"}</p>
              <p className="mt-3 font-bold text-slate-300">{scanned ? "FASTag verified. Balance debited." : "Position vehicle near scanner"}</p>
            </div>
          </div>
          <button type="button" onClick={simulateCameraCapture} className="mt-5 w-full rounded bg-amber-400 px-5 py-3 font-black text-slate-950 hover:bg-amber-300">
            Capture Random Vehicle
          </button>
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
              ["Vehicle", capturedVehicle.vehicleNumber],
              ["Type", capturedVehicle.vehicleType],
              ["Lane", capturedVehicle.laneNumber],
              ["Amount", formatCurrency(capturedVehicle.amount)],
              ["Captured", formatDateTime(capturedVehicle.capturedAt)],
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
