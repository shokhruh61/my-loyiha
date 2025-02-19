import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router navigatsiyasi uchun
import data from "../assets/data.json";
import Plus from "../assets/images/plus.svg";
import useStore from "../store/useStore"; // Zustand store-ni import qilish

const statusColors = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  draft: "bg-gray-100 text-gray-700",
};

function Center() {
  const navigate = useNavigate(); // Navigate hook
  const { isDarkMode, setDarkMode } = useStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Filter panelining holati

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, [setDarkMode]);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className={`p-6 max-w-[730px] mx-auto min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Invoices</h2>
          <p className="mb-6">{`There are ${data.length} invoices`}</p>
        </div>

        <div className="flex items-center space-x-4">
          <select className="flex items-center p-2 outline-none">
            <option value="all">Filter by status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>

          <button
            className="bg-[#7C5DFA] py-[10px] text-white cursor-pointer rounded-[40px] font-[700] text-[12px 15px] px-4 flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <img src={Plus} alt="" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {isFilterOpen && (
        <div className="absolute top-16 left-0 bg-white shadow-md p-4 w-64 rounded-md dark:bg-[#141625]">
          <h3 className="font-semibold text-gray-700 mb-4">Filter by Status</h3>
          <input type="text" placeholder="" />
        </div>
      )}

      <div className="space-y-4 mt-20">
        {data.map((invoice) => (
          <div
            key={invoice.id}
            className="p-4 flex items-center justify-between bg-white rounded-lg shadow-md dark:bg-[#141625] cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/invoice/${invoice.id}`)} // Navigate qilish
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                #{invoice.id}
              </h3>
              <p className="text-gray-500">Due {invoice.paymentDue}</p>
            </div>

            <p className="font-medium text-gray-800">{invoice.clientName}</p>

            <h3 className="text-lg font-bold text-gray-900">
              £{invoice.total.toFixed(2)}
            </h3>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                statusColors[invoice.status]
              }`}
            >
              {invoice.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Center;
