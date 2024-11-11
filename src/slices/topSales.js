import Api from "../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getResponseError } from "../lib/utils";

const initialState = { error: null, items: [], loading: false };

export const fetchTopSales = createAsyncThunk("topSales/fetchTopSales", async () => {
  const response = await fetch(Api.TOP_SALES);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
});

const topSalesSlice = createSlice({
  name: "topSales",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.error = getResponseError(action.error);
        state.loading = false;
      });
  },
});

export const selectTopSales = state => state.topSales;
export default topSalesSlice.reducer;
