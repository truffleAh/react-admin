import React, { Component } from "react";
import { Card, Button, Table } from "antd";
import { reqRoles } from "../../api";

export default class Role extends Component {
  state = {
    roles: [], //所有角色列表
    role: {}, //选中的role对象
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
        this.setState({ role });
      },
    };
  };

  getRoles = async () => {
    const result = await reqRoles();
    // console.log(result);
    if (result.data.status === 0) {
      const roles = result.data.data;
      this.setState({ roles });
    }
  };

  constructor(props) {
    super(props);
    this.intitColums();
  }
  //发送ajax请求获取角色列表
  componentDidMount() {
    this.getRoles();
  }

  render() {
    const { roles, role } = this.state;
    const title = (
      <span>
        <Button type="primary">创建角色</Button>&nbsp;&nbsp;
        <Button type="primary" disabled={!role._id}>
          设置角色权限
        </Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          dataSource={roles}
          columns={this.columns}
          bordered
          rowKey="_id"
          pagination={{ defaultPageSize: 5 }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id], //实现点击表格行即可选中radio
            onSelect: (role) => {
              //配置onSelect解决点击radio圆点无法选中的bug
              this.setState({ role });
            },
          }}
          onRow={this.onRow}
        ></Table>
      </Card>
    );
  }
}
