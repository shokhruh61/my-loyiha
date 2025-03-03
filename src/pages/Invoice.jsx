import React from "react";
import { useParams } from "react-router-dom";
import data from "../assets/data.json";
import useStore from "../store/useStore"; // Zustand store-ni import qilish

const statusColors = {
  paid: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  draft: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
};

function Invoice() {
  const { id } = useParams();
  const { isDarkMode } = useStore();
  const invoice = data.find((inv) => inv.id === id);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div
      className={`p-6 max-w-[730px] mx-auto min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Invoice #{invoice.id}</h2>
      <p className="mb-4">Client: {invoice.clientName}</p>
      <p className="mb-4">Due Date: {invoice.paymentDue}</p>
      <p className="mb-4">Total: £{invoice.total.toFixed(2)}</p>
      <span
        className={`px-4 py-1 rounded-full text-sm font-semibold ${
          statusColors[invoice.status]
        }`}
      >
        {invoice.status}
      </span>
    </div>
  );
}

export default Invoice;
