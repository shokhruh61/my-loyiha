// store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setDarkMode: (mode) => set({ isDarkMode: mode }),
}));

export default useStore;
