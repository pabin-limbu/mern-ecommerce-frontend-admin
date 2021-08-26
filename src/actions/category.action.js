import axiosInstance from "../helpers/axios";
import { categoryConstant } from "./constants";

const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST });

    const res = await axiosInstance.get("/category/getcategory");

    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST });
    const res = await axiosInstance.post("/category/create", form);
    if (res.status === 201) {
      dispatch({
        type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data.category },
      });
    } else {
      dispatch({
        type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
        payload: res.data.error,
      });
    }
   
  };
};
export const updateCategories = (form) => {
  return async (dispatch) => {
    const res = await axiosInstance.post("/category/update", form);
    if (res.status === 201) {
      dispatch(getAllCategory());
      dispatch({ type: categoryConstant.UPDATE_CATEGORY_SUCCESS });
    } else {
      const { error } = res.data;
      dispatch({
        type: categoryConstant.UPDATE_CATEGORY_FAILURE,
        payload: { error },
      });
    }
  };
};

export const deleteCategory = (ids) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.DELETE_CATEGORY_REQUEST });
    const res = await axiosInstance.post("/category/delete", {
      payload: { ids },
    });
    if (res.status == 201) {
      dispatch({ type: categoryConstant.DELETE_CATEGORY_SUCCESS });
      dispatch(getAllCategory());
    } else {
      const { error } = res.data;
      dispatch({
        type: categoryConstant.DELETE_CATEGORY_FAILURE,
        payload: { error },
      });
    }
  };
};

export { getAllCategory };
