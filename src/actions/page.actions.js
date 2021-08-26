import axiosInstance from "../helpers/axios";
import { pageConstant } from "./constants";

export const createPage = (form) => {
  return async (dispatch) => {
    console.log("i am dispatching");
    dispatch({ type: pageConstant.CREATE_PAGE_REQUEST });
    try {
      const res = await axiosInstance.post("/page/create", form);
      if (res.status === 201) {
        dispatch({
          type: pageConstant.CREATE_PAGE_SUCCESS,
          payload: { page: res.data.body },
        });
      } else {
        dispatch({
          type: pageConstant.CREATE_PAGE_FAILURE,
          payload: { error: res.data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
