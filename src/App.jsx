import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Admin from "./pages/Admin.jsx";
import CollectToll from "./pages/CollectToll.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FastagScanner from "./pages/FastagScanner.jsx";
import History from "./pages/History.jsx";
import Home from "./pages/Home.jsx";
import ManualPayment from "./pages/ManualPayment.jsx";
import Receipt from "./pages/Receipt.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collect" element={<CollectToll />} />
        <Route path="/fastag" element={<FastagScanner />} />
        <Route path="/manual-payment" element={<ManualPayment />} />
        <Route path="/receipt/:transactionId" element={<Receipt />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
