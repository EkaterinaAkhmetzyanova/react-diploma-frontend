import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
};

export const getTopSales = createAsyncThunk(
  "topSales/getTopSales",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}top-sales`
    );
    const data = await response.json();
    return data;
  }
);

const topSalesSlice = createSlice({
  name: "topSales",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTopSales.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getTopSales.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(getTopSales.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default topSalesSlice.reducer;
