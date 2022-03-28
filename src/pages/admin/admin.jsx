import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import { Layout } from "antd";
import LeftNav from "../../components/leftNav";
import Header from "../../components/header";
const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    //内存没有user说明没登录,自动跳转到登录界面
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ backgroundColor: "#fff" }}>Content</Content>
          <Footer style={{ textAlign: "center", color: "grey" }}>
            推荐使用谷歌浏览器,可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
