import axiosInstance from "../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
  return async (dispatch) => {
    //console.log(user);
    dispatch({ type: authConstants.LOGIN_REQUEST });

    const res = await axiosInstance.post("/admin/signin", { ...user });
    // .then(function (res) {
    //   console.log(res);
    // })
    // .catch(function (error) {
    //   console.log(error.response.data.message);
    // });

    if (res.status === 200) {
      const { token, user } = res.data;
      //console.log(token, user);
      //localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }

    // dispatch({
    //   type: authConstants.LOGIN_REQUEST,
    //   payload: {
    //     ...user,
    //   },
    // });
  };
};

// /*SIGN UP */
// export const signup = (user) => {
//   return async (dispatch) => {
//     //console.log(user);
//     dispatch({ type: authConstants.LOGIN_REQUEST });

//     const res = await axiosInstance.post("/admin/signup", { ...user });
//     // .then(function (res) {
//     //   console.log(res);
//     // })
//     // .catch(function (error) {
//     //   console.log(error.response.data.message);
//     // });

//     if (res.status === 200) {
//       const { message } = res.data;
//       //console.log(token, user);
//       //localStorage.clear();

//       dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { token, user } });
//     } else {
//       if (res.status === 400) {
//         dispatch({
//           type: authConstants.LOGIN_FAILURE,
//           payload: { error: res.data.error },
//         });
//       }
//     }
//   };
// };

export const isUserLogedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(window.localStorage.getItem("user"));
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to LOGIN" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axiosInstance.post("/admin/signout");
    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
