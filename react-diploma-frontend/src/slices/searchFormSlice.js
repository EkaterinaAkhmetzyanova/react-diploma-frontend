import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  searchFormField: "",
};

const searchFormSlice = createSlice({
  name: "searchForm",
  initialState,
  reducers: {
    setOpening: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSearchQuery: (state, action) => {
      state.searchFormField = action.payload;
    },
    resetSearchForm: () => initialState,
  },
});

export const { setOpening, setSearchQuery, resetSearchForm } =
  searchFormSlice.actions;

export default searchFormSlice.reducer;
