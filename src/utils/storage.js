const STORAGE_KEY = "nhai-toll-transactions";

export function getTransactions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveTransaction(transaction) {
  const transactions = getTransactions();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([transaction, ...transactions]));
}

export function findTransaction(transactionId) {
  return getTransactions().find((transaction) => transaction.transactionId === transactionId);
}

export function clearTransactions() {
  localStorage.removeItem(STORAGE_KEY);
}

export function buildTransaction({ plaza, vehicleNumber, vehicleType, laneNumber, paymentMode, amount }) {
  return {
    transactionId: `NHAI${Date.now()}${Math.floor(Math.random() * 90 + 10)}`,
    plazaId: plaza.id,
    plazaName: plaza.name,
    city: plaza.city,
    state: plaza.state,
    highway: plaza.highway,
    vehicleNumber: vehicleNumber.toUpperCase(),
    vehicleType,
    laneNumber,
    paymentMode,
    amount,
    createdAt: new Date().toISOString(),
    status: "Paid",
  };
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTime(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
