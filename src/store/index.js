import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {
  cartReducer, categoriesReducer, orderReducer, productReducer, productsReducer, topSalesReducer,
} from "../reducers";
import { thunk } from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({
  cart: cartReducer,
  categories: categoriesReducer,
  order: orderReducer,
  product: productReducer,
  products: productsReducer,
  topSales: topSalesReducer,
}), composeEnhancers(applyMiddleware(thunk)));

export default store;
