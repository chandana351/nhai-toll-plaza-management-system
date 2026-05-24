import { formatCurrency, formatDateTime } from "./storage.js";

export function downloadReceipt(transaction) {
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

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${transaction.transactionId}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 28px; color: #17202a; }
    .receipt { max-width: 520px; border: 1px solid #1f2937; padding: 24px; }
    h1 { font-size: 22px; margin: 0 0 4px; }
    p { margin: 0 0 20px; color: #536171; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 10px 0; border-bottom: 1px solid #d7dee8; }
    td:first-child { color: #536171; }
    td:last-child { font-weight: 700; text-align: right; }
    .paid { margin-top: 20px; padding: 10px; background: #e8f5ee; color: #11633a; font-weight: 700; text-align: center; }
  </style>
</head>
<body>
  <section class="receipt">
    <h1>NHAI Toll Plaza Receipt</h1>
    <p>Valid toll payment acknowledgement</p>
    <table>${rows.map(([label, value]) => `<tr><td>${label}</td><td>${value}</td></tr>`).join("")}</table>
    <div class="paid">PAID</div>
  </section>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `NHAI_Toll_Receipt_${transaction.transactionId}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}
