import {
  CHANGE_ORDER_FORM_INPUT, CLEAR_ORDER_FORM, FETCH_ORDER_FAILURE, FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  error: null,
  form: { address: "", agreement: false, phone: "" },
  loading: false,
  success: false,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ORDER_FORM_INPUT: {
      const { name, value } = action.payload;

      return { ...state, form: { ...state.form, [name]: value } };
    }
    case CLEAR_ORDER_FORM:
      return { ...state, form: { ...initialState.form } };
    case FETCH_ORDER_FAILURE:
      return { ...state, error: action.payload.error, loading: false, success: false };
    case FETCH_ORDER_REQUEST:
      return { ...state, loading: true };
    case FETCH_ORDER_SUCCESS:
      return { ...initialState, success: true };
    default:
      return state;
  }
}
