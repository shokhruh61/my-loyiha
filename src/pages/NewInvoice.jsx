import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

function NewInvoice() {
  const navigate = useNavigate();
  const { isDarkMode, setDarkMode } = useStore();
  const [invoiceDate, setInvoiceDate] = useState("");
  const [paymentDue, setPaymentDue] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [items, setItems] = useState([
    { name: "", qty: 0, price: 0, total: 0 },
  ]);
  const [errors, setErrors] = useState({});

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

  const handleAddItem = () => {
    setItems([...items, { name: "", qty: 0, price: 0, total: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index
        ? { ...item, [field]: value, total: item.qty * item.price }
        : item
    );
    setItems(newItems);
  };

  const validate = () => {
    const newErrors = {};
    if (!invoiceDate) newErrors.invoiceDate = "Invoice date is required";
    if (!paymentDue) newErrors.paymentDue = "Payment due date is required";
    if (!projectDescription)
      newErrors.projectDescription = "Project description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const invoiceData = {
      invoiceDate,
      paymentDue,
      projectDescription,
      items,
    };
    console.log("Invoice Data:", invoiceData);
    // Add logic to save or send the invoice
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className={`h-full max-w-[719px] mx-auto shadow-md p-14 rounded-md ${
          isDarkMode ? "bg-[#141625] text-white" : "bg-white text-gray-800"
        }`}
      >
        <h3 className="mb-4 mt-[59px] text-2xl font-bold text-[#FFFFFF]">
          New Invoice
        </h3>

        <h4 className="font-black text-[12px] leading-[15px] text-[#7C5DFA] mt-[48px] mb-[24px]">
          Bill From
        </h4>

        <label>
          <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5">
            Street Address
          </h5>
          <input
            className="w-[504px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
            type="text"
          />
        </label>
        <div className="flex items-center gap-6 mt-6">
          <div>
            <label>
              <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5">
                City
              </h5>
              <input
                className="w-[152px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5">
                Post Code
              </h5>
              <input
                className="w-[152px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5">
                Country
              </h5>
              <input
                className="w-[152px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
                type="text"
              />
            </label>
          </div>
        </div>

        <div className="mt-12">
          <h4 className="font-black text-[12px] leading-[15px] text-[#7C5DFA] mt-[48px] mb-[24px]">
            Bill To
          </h4>
          <label>
            <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5">
              Client’s Name
            </h5>
            <input
              className="w-[504px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4 mb-6"
              type="text"
            />
          </label>
          <label>
            <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5">
              Client’s Email
            </h5>
            <input
              className="w-[504px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
              type="email"
            />
          </label>

          <label>
            <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5 mt-6">
              Street Address
            </h5>
            <input
              className="w-[504px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
              type="text"
            />
          </label>
        </div>

        <div className="flex items-center gap-6 mt-6">
          <div>
            <label>
              <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5">
                City
              </h5>
              <input
                className="w-[152px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5">
                Post Code
              </h5>
              <input
                className="w-[152px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5">
                Country
              </h5>
              <input
                className="w-[152px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
                type="text"
              />
            </label>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-6">
          <div>
            <label>
              <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5 mt-6">
                Invoice Date
              </h5>
              <input
                className={`w-[240px] border ${
                  errors.invoiceDate ? "border-red-500" : "border-[#252945]"
                } bg-[#1E2139] rounded py-3 px-4`}
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                required
              />
              {errors.invoiceDate && (
                <p className="text-red-500 text-xs mt-1">{errors.invoiceDate}</p>
              )}
            </label>
          </div>

          <div>
            <label>
              <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5 mt-6">
                Payment Due
              </h5>
              <input
                className={`w-[240px] border ${
                  errors.paymentDue ? "border-red-500" : "border-[#252945]"
                } bg-[#1E2139] rounded py-3 px-4`}
                type="date"
                value={paymentDue}
                onChange={(e) => setPaymentDue(e.target.value)}
                required
              />
              {errors.paymentDue && (
                <p className="text-red-500 text-xs mt-1">{errors.paymentDue}</p>
              )}
            </label>
          </div>
        </div>
        <div className="">
          <label>
            <h5 className="font-normal text-[12px] leading-[15px] text-[#DFE3FA] mb-2.5 mt-6">
              Project Description
            </h5>
            <input
              className={`w-[504px] border ${
                errors.projectDescription ? "border-red-500" : "border-[#252945]"
              } bg-[#1E2139] rounded py-3 px-4`}
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
            {errors.projectDescription && (
              <p className="text-red-500 text-xs mt-1">
                {errors.projectDescription}
              </p>
            )}
          </label>
        </div>

        <div>
          <div>
            <h3 className="mb-4 mt-[59px] text-2xl font-bold text-[#777F98]">
              Item List
            </h3>
          </div>

          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center w-[464px] justify-between"
            >
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
                placeholder="Item Name"
                className="w-[100px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
              />
              <input
                type="number"
                value={item.qty}
                onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                placeholder="Qty."
                className="w-[50px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
                placeholder="Price"
                className="w-[100px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
              />
              <input
                type="number"
                value={item.total}
                readOnly
                placeholder="Total"
                className="w-[100px] border border-[#252945] bg-[#1E2139] rounded py-3 px-4"
              />
            </div>
          ))}

          <div>
            <button
              type="button"
              onClick={handleAddItem}
              className="px-[165px] py-[16px] bg-[#252945] font-bold text-lg rounded-3xl mt-4 cursor-pointer"
            >
              + Add New Item
            </button>
          </div>
        </div>

        <div className="flex items-center gap-[100px] mt-12">
          <div>
            <button
              type="button"
              className="bg-[#F9FAFE] py-[17px] px-[23px] text-[#7E88C3] rounded-[40px]"
              onClick={() => navigate("/")}
            >
              Discard
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="bg-[#373B53] py-[17px] px-[23px] text-[#DFE3FA] rounded-[40px]"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="bg-[#7C5DFA] py-[17px] px-[23px] text-[#DFE3FA] rounded-[40px]"
            >
              Save & Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewInvoice;
