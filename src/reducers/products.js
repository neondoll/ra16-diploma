import {
  CLEAR_PRODUCTS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS_FIRST,
  FETCH_PRODUCTS_SUCCESS_MORE, SET_PRODUCT_QUERY,
} from "../actions/actionTypes";

const initialState = { error: null, items: [], loading: false, query: "" };

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_PRODUCTS:
      return { ...state, items: [] };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, error: null, loading: true };
    case FETCH_PRODUCTS_SUCCESS_FIRST:
      return { ...state, error: null, items: action.payload.items, loading: false };
    case FETCH_PRODUCTS_SUCCESS_MORE:
      return { ...state, error: null, items: [...state.items, ...action.payload.items], loading: false };
    case SET_PRODUCT_QUERY:
      return { ...state, query: action.payload.query };
    default:
      return state;
  }
}
