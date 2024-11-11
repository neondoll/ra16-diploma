import Api from "../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getResponseError } from "../lib/utils";

const initialState = {
  error: null,
  form: { address: "", agreement: false, phone: "" },
  loading: false,
  success: false,
};

export const fetchOrder = createAsyncThunk("order/fetchOrder", async ({ items, form }) => {
  const orderData = items.map(item => ({ id: item.id, price: item.price, count: item.count }));

  const response = await fetch(Api.ORDER, {
    body: JSON.stringify({
      items: orderData,
      owner: { address: form.address, phone: form.phone },
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.status;
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    changeOrderFormInput: (state, action) => {
      const { name, value } = action.payload;

      state.form = { ...state.form, [name]: value };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        if (action.payload >= 200 && action.payload < 300) {
          state.form = { ...initialState.form };
          state.loading = false;
          state.success = true;
        }
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = getResponseError(action.error);
        state.loading = false;
      });
  },
});

export const selectOrder = state => state.order;
export const { changeOrderFormInput } = orderSlice.actions;
export default orderSlice.reducer;
