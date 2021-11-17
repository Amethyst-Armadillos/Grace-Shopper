import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import { UserInfo } from "./components/UserInfo";
import { EditUser } from "./components/EditUser";
import { EditProduct } from "./components/EditProduct";
import { NewProduct } from "./components/NewProduct";
import OrderHistory from "./components/OrderHistory";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route path="/home" exact component={Home} />
          {!isLoggedIn && <Route path="/login" component={Login} />}
          {!isLoggedIn && <Route path="/signup" component={Signup} />}
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/userinfo" component={UserInfo} />
          <Route exact path="/history" component={OrderHistory} />
          <Route exact path="/users/:id" component={EditUser} />
          <Route exact path="/products/:id/edit" component={EditProduct} />
          <Route exact path="/create/products" component={NewProduct} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
