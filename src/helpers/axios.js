//creating instance of axios so that it can be reused.

import axios from "axios";
import { api } from "../urlConfig";
import store from "../store";
import { authConstants } from "../actions/constants";
/**send token in headers:--> api will check if valid user or not */
//const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: "",
    //Authorization: token ? `Bearer ${token}` : null,
  },
});

// for req body
axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    //since above way of sending token is sending old token so this function is sending new token .
    //because, this time we fetch token from store but not from localstorage.
    //
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

//Handle response before try catch
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { status } = error.response;
    if (status === 500) {
      localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

/**NOTE: when axios file is exicuted it gets token from local storage as null because this file is executed when application starts
 *   so tokan is called before user gets the token from backend.
 *   client use axious instance to send headers info to server which include token.
 *   so with axios instance we are sending empty token which is a problem and to solve this we will be using
 * interceptors---
 *  interseptors are the middlaware which allow an application to intercept req or res befor it is been handeled by the .then or catch block.
 *
 * so. wvwry time we use axios instance we will intercept the req header with fetched token.
 **/
