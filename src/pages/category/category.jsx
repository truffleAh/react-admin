import { Button, Card, Table, Space, message } from "antd";
import React, { Component } from "react";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-buttton/index";
import "./index.less";
import { reqCategories } from "../../api/index";

export default class Category extends Component {
  state = {
    loading: false,
    categories: [],
  };

  /* 初始化Table所有列 */
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
      },

      {
        title: "操作",
        width: 300,
        render: () => (
          <Space size="middle">
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </Space>
        ),
      },
    ];
  };
  /* 异步获取一级分类列表显示 */
  getCategories = async () => {
    //发请求前,显示loading转圈效果
    this.setState({ loading: true });

    //发异步ajax请求获取数据,由于返回promise对象,用async+await阻塞获取
    const result = await reqCategories("0");
    // console.log(result, result.data.status);测试代码

    //请求完成后,去掉loading转圈效果
    this.setState({ loading: false });

    if (result.status === 200) {
      const categories = result.data.data;
      this.setState({ categories });
    } else {
      message.error("获取分类列表失败");
    }
  };
  // 为第一次render准备数据
  constructor(props) {
    super(props);
    /* colums数据不要放到render里,每次渲染都读取影响性能,作为属性挂到this上即可
    将数据初始化封装成一个函数,钩子中调用完成初始化即可,实现数据与逻辑分离 */
    this.initColumns();
  }
  //执行异步任务：发送异步ajax请求
  componentDidMount() {
    this.getCategories();
  }

  render() {
    const { categories, loading } = this.state;

    const title = "一级分类列表";
    const extra = (
      <Button type="primary">
        <PlusOutlined />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={categories}
          columns={this.columns}
          bordered
          rowKey="id"
          pagination={{ defaultPageSize: 5 }}
          loading={loading}
        />
      </Card>
    );
  }
}
