import queryString from "query-string";
import {
  CHANGE_ORDER_FORM_INPUT, CLEAR_ORDER_FORM, CLEAR_PRODUCTS, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS, FETCH_ORDER_FAILURE, FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS_FIRST, FETCH_PRODUCTS_SUCCESS_MORE, FETCH_TOP_SALES_FAILURE, FETCH_TOP_SALES_REQUEST,
  FETCH_TOP_SALES_SUCCESS, REPLACE_CART_ITEMS, SET_CURRENT_CATEGORY_ID, SET_PRODUCT_QUERY,
} from "./actionTypes";
import { getResponseError } from "../lib/utils";
import { redirect } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL + "/api";

export const changeOrderFormInput = (name, value) => ({ type: CHANGE_ORDER_FORM_INPUT, payload: { name, value } });
export const clearOrderForm = () => ({ type: CLEAR_ORDER_FORM });
export const clearProducts = () => ({ type: CLEAR_PRODUCTS });

export const fetchCategories = () => (dispatch) => {
  dispatch(fetchCategoriesRequest());

  fetch(`${backendUrl}/categories`)
    .then(response => response.json())
    .then(data => dispatch(fetchCategoriesSuccess(data)))
    .catch(error => dispatch(fetchCategoriesFailure(getResponseError(error))));
};
export const fetchCategoriesFailure = error => ({ type: FETCH_CATEGORIES_FAILURE, payload: { error } });
export const fetchCategoriesRequest = () => ({ type: FETCH_CATEGORIES_REQUEST });
export const fetchCategoriesSuccess = items => ({ type: FETCH_CATEGORIES_SUCCESS, payload: { items } });

export const fetchProduct = id => async (dispatch) => {
  dispatch(fetchProductRequest());

  return fetch(`${backendUrl}/items/${id}`)
    .then((response) => {
      if (response.status === 404) {
        redirect("/404");

        return null;
      }

      return response.json();
    })
    .then(data => dispatch(fetchProductSuccess(data)))
    .catch(error => dispatch(fetchProductFailure(error.message)));
};
export const fetchProductFailure = error => ({ type: FETCH_PRODUCT_FAILURE, payload: { error } });
export const fetchProductRequest = () => ({ type: FETCH_PRODUCT_REQUEST });
export const fetchProductSuccess = item => ({ type: FETCH_PRODUCT_SUCCESS, payload: { item } });

export const fetchProducts = offset => async (dispatch, getState) => {
  const { products: { query }, categories: { current } } = getState();

  dispatch(fetchProductsRequest());

  if (!offset) {
    dispatch(clearProducts());
  }

  const params = queryString.stringify({ offset, categoryId: current, q: query });

  fetch(`${backendUrl}/items?${params}`, {
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (offset === 0) {
        dispatch(fetchProductsSuccessFirst(data));
      }

      if (offset > 0) {
        dispatch(fetchProductsSuccessMore(data));
      }
    })
    .catch(error => dispatch(fetchProductsFailure(error.message)));
};
export const fetchProductsFailure = error => ({ type: FETCH_PRODUCTS_FAILURE, payload: { error } });
export const fetchProductsRequest = () => ({ type: FETCH_PRODUCTS_REQUEST });
export const fetchProductsSuccessFirst = items => ({ type: FETCH_PRODUCTS_SUCCESS_FIRST, payload: { items } });
export const fetchProductsSuccessMore = items => ({ type: FETCH_PRODUCTS_SUCCESS_MORE, payload: { items } });

export const fetchTopSales = () => (dispatch) => {
  dispatch(fetchTopSalesRequest());

  fetch(`${backendUrl}/top-sales`)
    .then(response => response.json())
    .then(data => dispatch(fetchTopSalesSuccess(data)))
    .catch(error => dispatch(fetchTopSalesFailure(getResponseError(error))));
};
export const fetchTopSalesFailure = error => ({ type: FETCH_TOP_SALES_FAILURE, payload: { error } });
export const fetchTopSalesRequest = () => ({ type: FETCH_TOP_SALES_REQUEST });
export const fetchTopSalesSuccess = items => ({ type: FETCH_TOP_SALES_SUCCESS, payload: { items } });

export const replaceCartItems = items => ({ type: REPLACE_CART_ITEMS, payload: { items } });
export const restoreCart = () => (dispatch) => {
  const items = JSON.parse(localStorage.getItem("cart"));

  if (items) {
    dispatch(replaceCartItems(items));
  }
};
export const searchProducts = query => (dispatch) => {
  dispatch(setProductQuery(query));
  dispatch(fetchProducts(0));
};

export const fetchOrder = (items, form) => (dispatch) => {
  dispatch(fetchOrderRequest());

  const orderData = items.map(item => ({ id: item.id, price: item.price, count: item.count }));

  fetch(`${backendUrl}/order`, {
    body: JSON.stringify({
      items: orderData,
      owner: { address: form.address, phone: form.phone },
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(clearOrderForm());
        dispatch(setCartItems([]));
        dispatch(fetchOrderSuccess());
      }
    })
    .catch(error => dispatch(fetchOrderFailure(error)));
};
export const fetchOrderFailure = error => ({ type: FETCH_ORDER_FAILURE, payload: { error } });
export const fetchOrderRequest = () => ({ type: FETCH_ORDER_REQUEST });
export const fetchOrderSuccess = () => ({ type: FETCH_ORDER_SUCCESS });

export const setCartItems = items => (dispatch) => {
  dispatch(replaceCartItems(items));

  localStorage.setItem("cart", JSON.stringify(items));
};
export const setCurrentCategoryId = id => ({ type: SET_CURRENT_CATEGORY_ID, payload: { id } });
export const setProductQuery = query => ({ type: SET_PRODUCT_QUERY, payload: { query } });
