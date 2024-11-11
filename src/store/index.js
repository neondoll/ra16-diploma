import {
  cartReducer, categoriesReducer, orderReducer, productReducer, productsReducer, topSalesReducer,
} from "../slices";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    order: orderReducer,
    product: productReducer,
    products: productsReducer,
    topSales: topSalesReducer,
  },
});

export default store;
