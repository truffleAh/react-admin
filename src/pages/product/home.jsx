import React, { Component } from "react";
import { Card, Select, Input, Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-buttton";
import { reqProducts } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";
const Option = Select.Option;
/* Product的默认子路由组件 */

export default class ProductHome extends Component {
  state = {
    products: [],
    total: 0, //商品总数量
    loading: false,
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
  /* 获取指定页码的列表数据显示 */
  getProducts = async (pageNum) => {
    this.setState({ loading: true }); //显示loading
    const result = await reqProducts(pageNum, PAGE_SIZE);
    this.setState({ loading: false }); //隐藏loading
    if (result.data.status === 0) {
      const { total, list } = result.data.data;
      this.setState({ total, products: list });
    }
  };

  constructor(props) {
    super(props);
    this.initColums();
  }

  componentDidMount() {
    this.getProducts(1);
  }

  render() {
    const { products, total, loading } = this.state;

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
          pagination={{
            defaultPageSize: PAGE_SIZE,
            total,
            showQuickJumper: true,
            //翻页事件监听,获取当前分页数据
            onChange: this.getProducts,
          }}
          loading={loading}
        />
      </Card>
    );
  }
}
