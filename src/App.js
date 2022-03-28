import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
import { message } from "antd";

/* 应用的根组件 */
export default class App extends Component {
  handleClick = () => {
    message.success("success");
  };
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch>
      </div>
    );
  }
}
