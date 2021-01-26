import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home/index";
import Signin from "./containers/Signin/index";
import Signup from "./containers/Signup/index";
import Products from "./containers/products/index";
import Orders from "./containers/orders/index";
import Category from "./containers/Category/index";
import PrivateRoute from "./components/HOC/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLogedIn } from "./actions/auth.actions";
import { getAllCategory } from "./actions/category.action";
import { getInitialData } from "./actions";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); //fetch state.auth as state from store.
  //check and restrit user to navigate to signin page if user is already logged in.
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogedIn());
    }
    dispatch(getInitialData());
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
