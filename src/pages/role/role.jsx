import React, { Component } from "react";
import { Card, Button, Table } from "antd";

export default class Role extends Component {
  state = {
    roles: [
      {
        menus: ['["/category","/home"]'],
        _id: "00000d0005e0d7292bd72914",
        name: "测试",
        auth_time: 1607481252131,
        auth_name: "admin",
        create_time: 1554639521749,
      },
      {
        menus: ['["/home","/products","/category","/product","/charts/pie"]'],
        _id: "00000d0005e171d55d59eb64",
        name: "测试",
        auth_time: 1607406938634,
        auth_name: "admin",
        create_time: 1578573141547,
      },
      {
        menus: [
          '["all","/home","/products","/category","/product","/user","/role","/charts","/charts/bar","/charts/line","/charts/pie"]',
        ],
        _id: "00000d0005e175a134bce5e3",
        name: "管理员",
        auth_time: 1578588698490,
        auth_name: "admin",
        create_time: 1578588691768,
      },
      {
        menus: [
          '["/home","/charts/bar","/charts","/charts/line","/charts/pie","/role"]',
        ],
        _id: "00000d0005e188bb874c8932",
        name: "员工",
        auth_time: 1607330722391,
        auth_name: "admin",
        create_time: 1578666936202,
      },
      {
        menus: ['["/category"]'],
        _id: "00000d0005fcdca798e518d4",
        name: "你好",
        auth_time: 1607411041057,
        auth_name: "admin",
        create_time: 1607322233401,
      },
      {
        menus: ["[]"],
        _id: "00000d0005fcdcb428e518d4",
        name: "哈哈哈",
        auth_time: null,
        auth_name: "",
        create_time: 1607322434116,
      },
      {
        menus: ["[]"],
        _id: "00000d0005fcdcb528e518d4",
        name: "哈哈啊",
        auth_time: null,
        auth_name: "",
        create_time: 1607322450051,
      },
      {
        menus: ["[]"],
        _id: "00000d0005fcdcd638e518d4",
        name: "123",
        auth_time: null,
        auth_name: "",
        create_time: 1607322979807,
      },
    ],
  };

  intitColums = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
      },
    ];
  };

  onRow = (role) => {
    return {
      onClick: (event) => {
        // alert("点击行");
        // console.log(role);
      },
    };
  };

  constructor(props) {
    super(props);
    this.intitColums();
  }

  render() {
    const title = (
      <span>
        <Button type="primary">创建角色</Button>&nbsp;&nbsp;
        <Button type="primary">设置角色权限</Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          dataSource={this.state.roles}
          columns={this.columns}
          bordered
          rowKey="_id"
          pagination={{ defaultPageSize: 5 }}
          rowSelection={{ type: "radio" }}
          onRow={this.onRow}
        ></Table>
      </Card>
    );
  }
}
