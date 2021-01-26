import axiousInstance from "../helpers/axios";

export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axiousInstance.post("/product/create", form);
    console.log(res);
    
  };
};
