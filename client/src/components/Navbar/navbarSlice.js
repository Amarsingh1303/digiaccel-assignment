import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = navbarSlice.actions;

export const selectSearchText = (state) => state.navbar.searchText;

export default navbarSlice.reducer;
