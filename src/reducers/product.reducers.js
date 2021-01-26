import { productConstaints } from "../actions/constants";
const initialState = {
  products: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case productConstaints.GET_ALL_PRODUCTS_SUCCESS:
      state = { ...state, products: action.payload.products };
      break;
  }
  return state;
};
