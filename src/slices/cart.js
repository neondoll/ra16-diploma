import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder } from "./order";

const initialState = { items: [], itemsCount: 0 };

const cartSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    replaceCartItems: (state, action) => {
      state.items = [...action.payload];
      state.itemsCount = action.payload.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        if (action.payload >= 200 && action.payload < 300) {
          state.items = [];
          state.itemsCount = 0;

          localStorage.setItem("cart", JSON.stringify([]));
        }
      });
  },
});

const { replaceCartItems } = cartSlice.actions;

export const restoreCart = () => (dispatch) => {
  const items = JSON.parse(localStorage.getItem("cart"));

  if (items) {
    dispatch(replaceCartItems(items));
  }
};
export const selectCartItems = state => state.cart.items;
export const selectCartItemsCount = state => state.cart.itemsCount;
export const setCartItems = items => (dispatch) => {
  dispatch(replaceCartItems(items));

  localStorage.setItem("cart", JSON.stringify(items));
};
export default cartSlice.reducer;
