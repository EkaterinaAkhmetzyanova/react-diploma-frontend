import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
};

export const postItems = createAsyncThunk(
  "cart/postItems",
  async (owner, { getState }) => {
    const { items } = getState().cart;
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner, items }),
    });
    return response.ok;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, amount, size } = action.payload;
      const selectedItem = state.items.findIndex(
        (el) => el.id === id && el.size === size
      );
      if (selectedItem === -1) {
        state.items.push(action.payload);
      } else {
        state.items[selectedItem].amount += amount;
      }
    },
    removeItem: (state, action) => {
      const { id, size } = action.payload;
      const deletedItem = state.items.findIndex(
        (el) => el.id === id && el.size === size
      );
      if (deletedItem !== -1) {
        state.items.splice(deletedItem, 1);
      }
    },
    resetCart: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postItems.pending, (state) => {
        state.status = "pending";
      })
      .addCase(postItems.fulfilled, (state) => {
        state.items = [];
        state.status = "success";
      })
      .addCase(postItems.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { addItem, removeItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
