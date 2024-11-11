import Api from "../api";
import Paths from "../paths";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getResponseError } from "../lib/utils";
import { redirect } from "react-router-dom";

const initialState = { error: null, item: {}, loading: false };

export const fetchProduct = createAsyncThunk("product/fetchProduct", async (id) => {
  const response = await fetch(`${Api.PRODUCTS}/${id}`);

  if (response.status === 404) {
    redirect(Paths.NOT_FOUND);

    return {};
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
});

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.item = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = getResponseError(action.error);
        state.loading = false;
      });
  },
});

export const selectProduct = state => state.product;
export default productSlice.reducer;
