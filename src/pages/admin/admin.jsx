import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    //内存没有user说明没登录,自动跳转到登录界面
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return <div>Hello {user.username}</div>;
  }
}
