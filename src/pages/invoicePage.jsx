import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInvoiceStore } from "../store/getStoredInvoices";

const statusColors = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  draft: "bg-gray-100 text-gray-700",
};

function InvoicePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { invoices, updateInvoiceStatus } = useInvoiceStore();

  // ID bo‘yicha invoice topamiz
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return <div className="text-center mt-10">Invoice not found</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen bg-gray-50 text-gray-800">
      {/* Go Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4 flex items-center"
      >
        ← Go back
      </button>

      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Status:</span>
          <span
            className={`px-3 py-1 rounded-md font-semibold ${
              statusColors[invoice.status]
            }`}
          >
            {invoice.status}
          </span>
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
            Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            Delete
          </button>
          <button
            onClick={() => updateInvoiceStatus(invoice.id, "paid")}
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            Mark as Paid
          </button>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-white shadow-md p-6 mt-6 rounded-lg">
        <h2 className="text-lg font-bold">#{invoice.id}</h2>
        <p className="text-gray-500">{invoice.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-gray-500">Invoice Date</p>
            <p className="font-semibold">{invoice.invoiceDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Payment Due</p>
            <p className="font-semibold">{invoice.paymentDue}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Bill To</p>
            <p className="font-semibold">{invoice.clientName}</p>
            <p className="text-gray-500">{invoice.clientAddress}</p>
          </div>
          <div>
            <p className="text-gray-500">Sent to</p>
            <p className="font-semibold">{invoice.clientEmail}</p>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-gray-100 rounded-lg p-4 mt-6">
          <div className="grid grid-cols-4 font-bold text-gray-600 mb-2">
            <p>Item Name</p>
            <p className="text-center">QTY.</p>
            <p className="text-center">Price</p>
            <p className="text-right">Total</p>
          </div>

          {invoice.items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 border-t py-2">
              <p>{item.name}</p>
              <p className="text-center">{item.quantity}</p>
              <p className="text-center">£{item.price.toFixed(2)}</p>
              <p className="text-right font-semibold">
                £{(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Total Amount */}
        <div className="bg-gray-900 text-white p-4 rounded-lg mt-4 flex justify-between items-center">
          <p className="font-semibold">Amount Due</p>
          <p className="text-xl font-bold">£{invoice.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
