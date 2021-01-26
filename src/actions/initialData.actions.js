import {
  categoryConstant,
  initialDataConstants,
  productConstaints,
} from "./constants";

import axiousInstance from "../helpers/axios";
export const getInitialData = () => {
  return async (dispatch) => {
    //dispatch({ type: initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST });
    const res = await axiousInstance.post("/initialdata");
    if (res.status === 200) {
      const { categories, products } = res.data;

      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories },
      });

      dispatch({
        type: productConstaints.GET_ALL_PRODUCTS_SUCCESS,
        payload: {
          products,
        },
      });
    }
    console.log(res);
  };
};
