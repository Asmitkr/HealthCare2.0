import { create } from "zustand";

const useUserInfo = create((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),
}));

export default useUserInfo;
