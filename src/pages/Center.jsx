import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router navigatsiyasi uchun
import data from "../assets/data.json";
import Plus from "../assets/images/plus.svg";
import useStore from "../store/useStore"; // Zustand store-ni import qilish

const statusColors = {
  paid: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  draft: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
};

function Center() {
  const navigate = useNavigate(); // Navigate hook
  const { isDarkMode, setDarkMode } = useStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Filter panelining holati
  const [filteredData, setFilteredData] = useState(data); // Filterlangan ma'lumotlar
  const [filterStatus, setFilterStatus] = useState("all"); // Filter statusi

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

  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(invoice => invoice.status === filterStatus));
    }
  }, [filterStatus]);

  return (
    <div
      className={`p-6 max-w-[730px] mx-auto min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Invoices</h2>
          <p className="mb-6">{`There are ${filteredData.length} invoices`}</p>
        </div>

        <div className="flex items-center space-x-4">
          <select
            className={`flex items-center p-2 outline-none ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Filter by status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>

          <button
            className="bg-[#7C5DFA] py-[10px] text-white cursor-pointer rounded-[40px] font-[700] text-[12px 15px] px-4 flex items-center gap-2"
            onClick={() => navigate("/new-invoice")}
          >
            <img src={Plus} alt="" />
            New Invoice
          </button>
        </div>
      </div>

      <div className="space-y-4 mt-20">
        {filteredData.map((invoice) => (
          <div
            key={invoice.id}
            className={`p-4 flex items-center justify-between rounded-lg shadow-md cursor-pointer hover:shadow-lg transition ${
              isDarkMode ? "bg-[#141625] text-white" : "bg-white text-gray-800"
            }`}
            onClick={() => navigate(`/invoice/${invoice.id}`)} // Navigate qilish
          >
            <div>
              <h3 className="text-sm font-semibold">#{invoice.id}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Due {invoice.paymentDue}
              </p>
            </div>

            <p className="font-medium">{invoice.clientName}</p>

            <h3 className="text-lg font-bold">£{invoice.total.toFixed(2)}</h3>

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
