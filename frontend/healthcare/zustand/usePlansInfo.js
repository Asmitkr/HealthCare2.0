import { create } from "zustand";

const usePlansInfo = create((set) => ({
  plansInfo: null,
  setPlansInfo: (plansInfo) => set({ plansInfo }), // Function to update the selected doctor's information
  searchResults: [], // Array to hold search results for doctors
  setSearchResults: (searchResults) => set({ searchResults }), // Function to update the search results
}));

export default usePlansInfo;
