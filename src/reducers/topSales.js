import { FETCH_TOP_SALES_FAILURE, FETCH_TOP_SALES_REQUEST, FETCH_TOP_SALES_SUCCESS } from "../actions/actionTypes";

const initialState = { error: null, items: [], loading: false };

export default function topSalesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_SALES_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
    case FETCH_TOP_SALES_REQUEST:
      return { ...state, error: null, loading: true };
    case FETCH_TOP_SALES_SUCCESS:
      return { ...state, items: action.payload.items, loading: false };
    default:
      return state;
  }
}
