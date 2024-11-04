import {
  FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, SET_CURRENT_CATEGORY_ID,
} from "../actions/actionTypes";

const initialState = { current: null, error: null, items: [], loading: false };

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, error: null, loading: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, items: action.payload.items, loading: false };
    case SET_CURRENT_CATEGORY_ID:
      return { ...state, current: action.payload.id };
    default:
      return state;
  }
}
