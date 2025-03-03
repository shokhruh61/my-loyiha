import { create } from "zustand";

const getStoredInvoices = () => {
  const stored = localStorage.getItem("invoices");
  return stored ? JSON.parse(stored) : [];
};

export const useInvoiceStore = create((set) => ({
  invoices: getStoredInvoices(),

  updateInvoiceStatus: (id, newStatus) => {
    set((state) => {
      const updatedInvoices = state.invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status: newStatus } : invoice
      );

      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

      return { invoices: updatedInvoices };
    });
  },
}));
