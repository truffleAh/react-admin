import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./css/login.less";
import logo from "../../assets/imgs/logo.png"; //注意jsx中引入图片的方式
import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
const { Item } = Form; //解构赋值

export default class Login extends Component {
  render() {
    //实现自动登录：若用户已登录(浏览器localStorage中存有值),则自动跳转到登录页面
    const user = memoryUtils.user;
    if (user && user._id) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          {/* 后期引入antd的Form组件 */}
          <Form
            className="login-form"
            initialValues={{
              remember: true,
              username: "admin",
              password: "admin",
            }}
            //统一验证
            onFinish={async (values) => {
              // console.log("Received values of form: ", values);
              const { username, password } = values;
              //发送给服务器
              /* reqLogin(username, password)
                .then((response) => {
                  console.log("成功", response.data);
                })
                .catch((error) => {
                  console.log("失败了", error);
                }); 
                */
              //用async和await简化promise的使用
              /* 在ajax.js文件中统一处理请求异常,try catch语句不再需要 */
              // try {
              const response = await reqLogin(username, password);
              // console.log("请求成功", response.data);
              const result = response.data;
              if (result.status === 0) {
                message.success("登录成功");
                /* 保存user */
                const user = result.data;
                memoryUtils.user = user; //保存到内存
                storageUtils.saveUser(user); //保存到local
                /* 编程式路由.跳转到管理界面，不需要回退用replace */
                this.props.history.replace("/admin");
              } else {
                message.error(result.msg);
              }
              // } catch (error) {
              //   alert("请求失败了", error.message);
              // }
            }}
            onFinishFailed={(errorFields) => {
              console.log("error: ", errorFields);
            }}
          >
            <Item
              name="username"
              //声明式验证
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
                { min: 4, message: "用户名至少4位" },
                { max: 12, message: "用户名至多12位" },
                {
                  pattern: /^\w/, //指定正则规则
                  message: "用户名必须是英文、数字或下划线组成",
                },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined
                    className="site-form-item-icon"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="用户名"
              />
            </Item>
            <Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                style={{ color: "rgba(0,0,0,.25)" }}
              />
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}
