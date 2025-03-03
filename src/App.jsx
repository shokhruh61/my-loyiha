import { useEffect } from "react";
import { useInvoiceStore } from "./store/getStoredInvoices";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoicePage from "./pages/invoicePage";
import Center from "./pages/Center";
import MainLayout from "./layouts/MainLayout";
import NewInvoice from "./pages/NewInvoice";
import Invoice from "./pages/Invoice";

const sampleInvoices = [
  {
    id: "XM9141",
    description: "Graphic Design",
    invoiceDate: "21 Aug 2021",
    paymentDue: "20 Sep 2021",
    clientName: "Alex Grim",
    clientAddress: "84 Church Way, Bradford, BDI 9PB, United Kingdom",
    clientEmail: "alexgrim@mail.com",
    status: "pending",
    items: [
      { name: "Banner Design", quantity: 1, price: 156.0 },
      { name: "Email Design", quantity: 2, price: 200.0 },
    ],
    total: 556.0,
  },
];

function App() {
  const { invoices } = useInvoiceStore();

  useEffect(() => {
    if (!localStorage.getItem("invoices")) {
      localStorage.setItem("invoices", JSON.stringify(sampleInvoices));
    }
  }, []);

  return (
    <Router>
      <MainLayout />
      <Routes>
        <Route path="/" element={<Center />} />
        <Route path="/invoice/:id" element={<Invoice />} />
        <Route path="/new-invoice" element={<NewInvoice />} />
      </Routes>
    </Router>
  );
}

export default App;
