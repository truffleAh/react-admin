import React, { Component } from "react";
import { Card, Select, Input, Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-buttton";
const Option = Select.Option;
/* Product的默认子路由组件 */

export default class ProductHome extends Component {
  state = {
    products: [
      {
        status: 1,
        imgs: ['["image-1559402448049.jpg","image-1559402450480.jpg"]'],
        _id: "00000d0005e12b9d1e31bb72",
        name: "华硕(ASUS) 飞行堡垒",
        desc: "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
        price: 6799,
        pCategoryId: "5e12b8bce31bb727e4b0e348",
        categoryId: "5fc74b650dd9b10798413162",
        detail:
          '<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n',
        __v: 0,
      },
      {
        status: 2,
        imgs: ['["image-1559402396338.jpg"]'],
        _id: "00000d0005e145c55d9ba8f3",
        name: "联想ThinkPad 翼4809",
        desc: "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        price: 65999,
        pCategoryId: "5e12b8bce31bb727e4b0e348",
        categoryId: "5fc74b650dd9b10798413162",
        detail: "",
        __v: 0,
      },
      {
        status: 1,
        imgs: ['["image-1559402396338.jpg"]'],
        _id: "00000d0005fc7096f0dd9b10",
        name: "美的(Midea) 213升-BCD-213TM",
        desc: "爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护",
        price: 1388,
        pCategoryId: "5e12b8bce31bb727e4b0e348",
        categoryId: "5fc30a1833fe4221c4546275",
        detail:
          '<p style="text-align:start;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, "microsoft yahei;">美的(Midea) 213升 节能静音家用三门小冰箱 阳光米 BCD-213TM(E)</span></p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, "Microsoft YaHei", "Hiragino Sans GB", u5b8bu4f53, sans-serif;">【4.8美的大牌秒杀日】爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护! *每天不到一度电,省钱又省心!</span>&nbsp;</p>\n',
        __v: 0,
      },
      {
        status: 1,
        imgs: ['["image-1554638676149.jpg","image-1554638683746.jpg"]'],
        _id: "00000d0005fc709a00dd9b10",
        name: "联想ThinkPad X1 Carbon",
        desc: "英特尔酷睿i5 14英寸轻薄笔记本电脑（i5-8250U 8G 256GSSD FHD）黑色",
        price: 9999,
        pCategoryId: "5e12b8bce31bb727e4b0e348",
        categoryId: "5fc74b650dd9b10798413162",
        detail:
          '<p style="text-align:start;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, "microsoft yahei;">联想ThinkPad X1 Carbon 2018（09CD）英特尔酷睿i5 14英寸轻薄笔记本电脑（i5-8250U 8G 256GSSD FHD）黑色</span></p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, "Microsoft YaHei", "Hiragino Sans GB", u5b8bu4f53, sans-serif;">年度重量级新品，X390、T490全新登场 更加轻薄机身设计，全面的配置升级，让工作更便捷，让生活更轻松</span><a href="https://pro.jd.com/mall/active/2M4o7NTzHH6jEJXS7VbpbTAANQB9/index.html" target="_blank"><span style="color: rgb(94,105,173);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, "Microsoft YaHei", "Hiragino Sans GB", u5b8bu4f53, sans-serif;">4月9日京东震撼首发，火爆预约</span></a>&nbsp;</p>\n',
        __v: 0,
      },
    ],
  };
  /* 初始化表格列 */
  initColums = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: (price) => "￥" + price,
      },
      {
        title: "状态",
        dataIndex: "status",
        width: 100,
        render: (status) => {
          return (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          );
        },
      },
      {
        title: "操作",
        width: 100,
        render: (product) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          );
        },
      },
    ];
  };

  constructor(props) {
    super(props);
    this.initColums();
  }

  render() {
    const { products } = this.state;

    const title = (
      <span>
        <Select value="1">
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{ width: 200, margin: "0 15px" }} />
        <Button type="primary">搜索</Button>
      </span>
    );
    const extra = (
      <Button type="primary">
        <PlusOutlined />
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          bordered
          dataSource={products}
          columns={this.columns}
        />
      </Card>
    );
  }
}
