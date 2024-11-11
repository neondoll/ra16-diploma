import Api from "../api";
import queryString from "query-string";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getResponseError } from "../lib/utils";

const initialState = { error: null, items: [], loading: false, query: "" };

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (offset, { dispatch, getState }) => {
  const { products: { query }, categories: { current } } = getState();

  if (!offset) {
    dispatch(clearProducts());
  }

  const params = queryString.stringify({ offset, categoryId: current, q: query });

  const response = await fetch(`${Api.PRODUCTS}?${params}`, {
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return { data, offset };
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.items = [];
    },
    setProductQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { data, offset } = action.payload;

        if (offset < 0) {
          return;
        }

        state.error = null;
        state.items = offset > 0 ? [...state.items, ...data] : data;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = getResponseError(action.error);
        state.loading = false;
      });
  },
});

export const selectProducts = state => state.products;
export const selectProductsLoading = state => state.products.loading;
export const selectProductsQuery = state => state.products.query;
export const searchProducts = query => (dispatch) => {
  dispatch(setProductQuery(query));
  dispatch(fetchProducts(0));
};
export const { clearProducts, setProductQuery } = productsSlice.actions;
export default productsSlice.reducer;
