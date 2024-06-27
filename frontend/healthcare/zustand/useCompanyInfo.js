import { create } from "zustand";

const useCompanyInfo = create((set) => ({
  companyInfo: null,
  setCompanyInfo: (companyInfo) => set({ companyInfo }),
  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),
}));

export default useCompanyInfo;
