import { Button, Card, Table, Space } from "antd";
import React, { Component } from "react";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-buttton/index";
import "./index.less";

export default class Category extends Component {
  render() {
    const title = "一级分类列表";
    const extra = (
      <Button type="primary">
        <PlusOutlined />
        添加
      </Button>
    );

    const dataSource = [
      {
        parentId: "0",
        id: "1",
        name: "家用电器",
        __v: 0,
      },
      {
        parentId: "0",
        id: "2",
        name: "洗衣机",
        __v: 0,
      },
      {
        parentId: "0",
        id: "3",
        name: "图书",
        __v: 0,
      },
      {
        parentId: "0",
        id: "4",
        name: "服装",
        __v: 0,
      },
      {
        parentId: "0",
        id: "5",
        name: "玩具",
        __v: 0,
      },
      {
        parentId: "0",
        id: "6",
        name: "医药",
        __v: 0,
      },
    ];

    const columns = [
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

    return (
      <Card title={title} extra={extra}>
        <Table dataSource={dataSource} columns={columns} bordered rowKey="id" />
      </Card>
    );
  }
}
