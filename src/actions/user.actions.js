import axiosInstance from "../helpers/axios";
import { authConstants, userConstants } from "./constants";

/*SIGN UP */
export const signup = (user) => {
  return async (dispatch) => {
    //console.log(user);
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });

    const res = await axiosInstance.post("/admin/signup", { ...user });
    // .then(function (res) {
    //   console.log(res);
    // })
    // .catch(function (error) {
    //   console.log(error.response.data.message);
    // });

    if (res.status === 201) {
      const { message } = res.data;
      //console.log(token, user);
      //localStorage.clear();

      dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: { message } });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
