import { configureStore } from "@reduxjs/toolkit";
import cart from "../slices/cartSlice";
import catalog from "../slices/catalogSlice";
import item from "../slices/itemSlice";
import searchForm from "../slices/searchFormSlice";
import topSales from "../slices/topSalesSlice";

export const store = configureStore({
  reducer: {
    cart,
    catalog,
    item,
    searchForm,
    topSales,
  },
});
