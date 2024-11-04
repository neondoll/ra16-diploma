import { REPLACE_CART_ITEMS } from "../actions/actionTypes";

const initialState = { items: [], itemsCount: 0 };

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case REPLACE_CART_ITEMS: {
      const { items } = action.payload;

      return { items: [...items], itemsCount: items.length };
    }
    default:
      return state;
  }
}
