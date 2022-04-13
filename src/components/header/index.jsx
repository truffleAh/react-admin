import React, { Component } from "react";
import "./index.less";
import { reqIP, reqWeather } from "../../api";
import { formatTime } from "../../utils/formatTime";
import { withRouter } from "react-router-dom";
import menuList from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import LinkButton from "../link-buttton";
/* admin页面的顶部header组件 */

class Header extends Component {
  state = {
    time: formatTime(new Date()),
    city: "",
    weather: "",
    temperature: "",
  };
  //获取当前时间到state中
  getTime = () => {
    const dateInstance = new Date();
    const time = formatTime(dateInstance);
    this.setState({ time });
  };
  //获取ip和天气
  getWeather = async () => {
    //获取ip地址
    const resultIp = await reqIP();
    const { adcode } = resultIp;
    //根据IP获取天气信息
    const resultWheather = await reqWeather(adcode);
    const { province, city, weather, temperature } = resultWheather;
    this.setState({
      city: `${province}-${city}`,
      temperature: `${temperature}℃`,
      weather,
    });
  };
  /* 动态更新content区域标题：、
  其更新与定时器无关,由于路径改变引发admin组件重新渲染,而header是其子组件,重新计算 */
  getTitle = () => {
    const path = this.props.location.pathname;
    let title;
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) === 0
        );
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };

  /* 退出登录 */
  logout = () => {
    Modal.confirm({
      title: "确定退出吗?",
      icon: <ExclamationCircleOutlined />,
      // content: "Some descriptions",
      onOk: () => {
        /* 由以下测试代码可知,onOk必须用箭头函数,否则拿不到this上的props */
        // console.log("OK", this);
        /* 删除保存的user数据【内存和浏览器本地存储都要删除】并跳转到Login页面 */
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace("/login");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  componentDidMount() {
    //定时器更新时间
    this.timer = setInterval(() => {
      this.getTime();
    }, 1000);
    this.getWeather();
  }
  /* 清除定时器 */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    // debugger
    const { time, city, temperature, weather } = this.state;
    const title = this.getTitle();
    //内存中取用户名
    const username = memoryUtils.user.username;

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
          {/* <a href="javascript:" onClick={this.logout}>
            退出
          </a> */}
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            &nbsp;<span>{time}</span>&nbsp;
            <span>{city}</span>&nbsp;
            <span>{`${weather} ${temperature}`}</span>&nbsp;
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
