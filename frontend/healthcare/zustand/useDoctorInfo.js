import { create } from "zustand";

const useDoctorInfo = create((set) => ({
  doctorInfo: null,
  setDoctorInfo: (doctorInfo) => set({ doctorInfo }), // Function to update the selected doctor's information
  searchResults: [], // Array to hold search results for doctors
  setSearchResults: (searchResults) => set({ searchResults }), // Function to update the search results
}));

export default useDoctorInfo;
