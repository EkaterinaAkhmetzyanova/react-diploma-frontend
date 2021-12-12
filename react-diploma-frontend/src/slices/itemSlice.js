import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
};

export const getItem = createAsyncThunk("item/getItem", async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}items/${id}`
  );
  const data = await response.json();
  return data;
});

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    resetItem: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItem.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getItem.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { resetItem } = itemSlice.actions;
export default itemSlice.reducer;
