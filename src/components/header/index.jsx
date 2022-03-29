import React, { Component } from "react";
import "./index.less";
import { reqIP, reqWeather } from "../../api";
import { formatTime } from "../../utils/formatTime";
/* admin页面的顶部header组件 */

export default class Header extends Component {
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

  componentDidMount() {
    //定时器更新时间
    this.timer = setInterval(() => {
      this.getTime();
    }, 1000);
    this.getWeather();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { time, city, temperature, weather } = this.state;

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,admin</span>
          <a href="javascript">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
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
