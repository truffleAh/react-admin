import React, { Component } from "react";
import { Card, Statistic, DatePicker, Timeline } from "antd";
import moment from "moment";
import {
  QuestionCircleOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import Line from "./line";
import Pie from "./pie";
import "./home.less";
const dateFormat = "YYYY/MM/DD";
const { RangePicker } = DatePicker;

export default class Home extends Component {
  state = {
    isVisited: true,
  };

  handleChange = (isVisited) => {
    return () => this.setState({ isVisited });
  };

  render() {
    const { isVisited } = this.state;

    return (
      <div className="home">
        <div className="home-header">
          <Card
            className="home-card"
            title="商品总量"
            extra={
              <QuestionCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            }
            style={{ width: 250 }}
            headStyle={{ color: "rgba(0,0,0,.45)" }}
          >
            <Statistic
              value={18281}
              suffix="个"
              style={{ fontWeight: "bolder" }}
            />
            <Statistic
              value={15}
              valueStyle={{ fontSize: 15 }}
              prefix={"周同比"}
              suffix={
                <div>
                  %
                  <ArrowDownOutlined style={{ color: "red", marginLeft: 10 }} />
                </div>
              }
            />
            <Statistic
              value={10}
              valueStyle={{ fontSize: 15 }}
              prefix={"日同比"}
              suffix={
                <div>
                  %
                  <ArrowUpOutlined
                    style={{ color: "#3f8600", marginLeft: 10 }}
                  />
                </div>
              }
            />
          </Card>
          <Line />
        </div>

        <Card
          className="home-content"
          extra={
            <RangePicker
              defaultValue={[
                moment("2021/01/01", dateFormat),
                moment("2021/12/01", dateFormat),
              ]}
              format={dateFormat}
            />
          }
        >
          <Card
            title="客户访问数据"
            className="home-table-left"
            bodyStyle={{ padding: 0, height: 275 }}
            extra={<ReloadOutlined />}
          >
            <Pie />
          </Card>

          <Card
            title="任务"
            extra={<ReloadOutlined />}
            className="home-table-right"
          >
            <Timeline>
              <Timeline.Item color="green">新版本迭代会</Timeline.Item>
              <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
              <Timeline.Item color="red">
                <p>联调接口</p>
                <p>功能验收</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>登录功能设计</p>
                <p>权限验证</p>
                <p>页面排版</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    );
  }
}
