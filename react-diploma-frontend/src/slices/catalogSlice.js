import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  categories: [],
  categoryId: 0,
  loadMore: true,
  searchField: "",
  status: {
    catalog: "idle",
    offset: "idle",
    categories: "idle",
  },
};

export const getAllCatalog = createAsyncThunk(
  "catalog/getAllCatalog",
  async (_, { getState }) => {
    const { items, categoryId, searchField } = getState().catalog;
    const params = new URLSearchParams({
      categoryId,
      offset: items.length,
      q: searchField,
    });
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}items?${params}`
    );
    const data = await response.json();
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().catalog;
      if (status.catalog === "pending" || status.offset === "pending") {
        return false;
      }
    },
  }
);

export const getCatalogCategories = createAsyncThunk(
  "catalog/getCatalogCategories",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}categories`
    );
    const data = await response.json();
    return data;
  }
);

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    chooseCategory: (state, action) => {
      state.items = [];
      state.loadMore = true;
      state.categoryId = action.payload;
    },
    makeSearch: (state, action) => {
      state.items = [];
      state.loadMore = true;
      state.searchField = action.payload;
    },
    resetCatalog: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCatalog.pending, (state, { meta }) => {
        if (meta.arg) {
          state.status.offset = "pending";
        } else {
          state.status.catalog = "pending";
        }
      })
      .addCase(getAllCatalog.fulfilled, (state, action) => {
        if (action.meta.arg) {
          state.status.offset = "success";
          state.items.push(...action.payload);
        } else {
          state.status.catalog = "success";
          state.items = action.payload;
        }
        if (action.payload.length !== 6) {
          state.loadMore = false;
        }
      })
      .addCase(getAllCatalog.rejected, (state, { meta }) => {
        if (meta.arg) {
          state.status.offset = "error";
        } else {
          state.status.catalog = "error";
        }
      })
      .addCase(getCatalogCategories.pending, (state) => {
        state.status.categories = "pending";
      })
      .addCase(getCatalogCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status.categories = "success";
      })
      .addCase(getCatalogCategories.rejected, (state) => {
        state.status.categories = "error";
      });
  },
});

export const { chooseCategory, makeSearch, resetCatalog } =
  catalogSlice.actions;
export default catalogSlice.reducer;
