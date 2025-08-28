// /store/useFilters.js
import { create } from "zustand";

export const useFilters = create((set) => ({
  HomeFilters: {},
  setFilters: (filters) => set({ HomeFilters: filters }),
}));
