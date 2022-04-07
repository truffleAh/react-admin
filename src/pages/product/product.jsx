import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductHome from "./home";
import ProductAdd from "./add";
import ProductDetail from "./detail";

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/products/product" exact component={ProductHome} />
        <Route path="/products/product/add" component={ProductAdd} />
        <Route path="/products/product/detail" component={ProductDetail} />
        <Redirect to="/products/product" />
      </Switch>
    );
  }
}
