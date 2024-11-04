import {
  CLEAR_PRODUCT,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
} from "../actions/actionTypes";

const initialState = { error: null, item: {}, loading: false };

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_PRODUCT:
      return { ...initialState };
    case FETCH_PRODUCT_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
    case FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, item: action.payload.item, loading: false };
    default:
      return state;
  }
}
