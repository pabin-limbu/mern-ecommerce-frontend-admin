//root reducer
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import { combineReducers } from "redux";
import productreducer from "./product.reducers";
import categoryReducer from "./category.reducers";
import orderReducer from "./order.reducers";

import pageReducers from "./page.reducers";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productreducer,
  order: orderReducer,
  page: pageReducers,
});

export default rootReducer;
