import { create } from "zustand";

// LocalStorage'dan invoice'larni olish
const getStoredInvoices = () => {
    const stored = localStorage.getItem("invoices");
    return stored ? JSON.parse(stored) : [];
};

// Zustand Store
export const useInvoiceStore = create((set) => ({
    invoices: getStoredInvoices(),

    // Invoice statusini yangilash
    updateInvoiceStatus: (id, newStatus) => {
        set((state) => {
            const updatedInvoices = state.invoices.map((invoice) =>
                invoice.id === id ? { ...invoice, status: newStatus } : invoice
            );

            // LocalStorage'ga yangilangan invoice'larni saqlash
            localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

            return { invoices: updatedInvoices };
        });
    }
}));
