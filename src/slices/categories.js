import Api from "../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getResponseError } from "../lib/utils";

const initialState = { current: null, error: null, items: [], loading: false };

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await fetch(Api.CATEGORIES);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCurrentCategoryId: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = getResponseError(action.error);
        state.loading = false;
      });
  },
});

export const selectCategories = state => state.categories;
export const selectCategoriesLoading = state => state.categories.loading;
export const { setCurrentCategoryId } = categoriesSlice.actions;
export default categoriesSlice.reducer;
