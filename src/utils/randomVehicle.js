import { tollRates, vehicleTypes } from "../data/tollData.js";

const stateCodes = ["KA", "TN", "TS", "AP", "MH", "KL", "GJ", "RJ", "DL", "HR", "PB", "UP", "MP", "WB", "OD", "BR"];
const letterPairs = ["AB", "CD", "EF", "GH", "JK", "LM", "NP", "QR", "ST", "UV", "WX", "YZ", "MC", "TN", "BH"];

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pad(number, size) {
  return String(number).padStart(size, "0");
}

export function generateVehicleNumber() {
  const state = pick(stateCodes);
  const rto = pad(Math.floor(Math.random() * 99) + 1, 2);
  const letters = pick(letterPairs);
  const digits = pad(Math.floor(Math.random() * 9000) + 1000, 4);
  return `${state}${rto}${letters}${digits}`;
}

export function captureRandomVehicle(plaza) {
  const vehicleType = pick(vehicleTypes);
  const laneNumber = `Lane ${Math.floor(Math.random() * plaza.lanes) + 1}`;

  return {
    vehicleNumber: generateVehicleNumber(),
    vehicleType,
    laneNumber,
    amount: tollRates[vehicleType],
    confidence: `${Math.floor(Math.random() * 8) + 91}%`,
    capturedAt: new Date().toISOString(),
  };
}
