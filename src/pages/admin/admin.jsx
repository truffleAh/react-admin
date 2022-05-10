import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import { Layout } from "antd";
import LeftNav from "../../components/leftNav";
import Header from "../../components/header";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import NotFound from "../not-found/not-found";
const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    //内存没有user说明没登录,自动跳转到登录界面
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          {/* 传入当前登录用户,用于菜单权限管理 */}
          <LeftNav user={user} />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: 15, backgroundColor: "#fff" }}>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/products/category" component={Category} />
              <Route path="/products/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "grey" }}>
            推荐使用谷歌浏览器获得更佳体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
