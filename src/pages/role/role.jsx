import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api";
import AddForm from "./add-form";
import AuthForm from "./anth-form";
import memoryUtils from "../../utils/memoryUtils";
import { formatDate } from "../../utils/dateUtils";

export default class Role extends Component {
  state = {
    roles: [], //所有角色列表
    role: {}, //选中的role对象
    isShowAdd: false,
    isShowAuth: false,
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
        render: formatDate,
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: formatDate,
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
  //验证并收集子组件表单数据,发送请求添加角色
  addRole = () => {
    this.form
      .validateFields()
      .then(async (values) => {
        this.setState({ isShowAdd: false }); //先隐藏Modal对话框
        const { roleName } = values;
        this.form.resetFields();
        const res = await reqAddRole(roleName);
        if (res.data.status === 0) {
          message.success("添加角色成功");
          //重新获取并显示添加角色后的列表,缺点是还得发请求,性能低
          // this.getRoles();
          //采用基于原本状态数据更新的方式
          const role = res.data.data;
          this.setState((state) => ({
            roles: [...this.state.roles, role],
          }));
        } else {
          message.error("添加角色失败");
        }
      })
      .catch((error) => message.error("请输入角色名称"));
  };
  //更新角色
  updateRole = async () => {
    const role = this.state.role;
    const menus = this.auth.current.getMenus();
    role.menus = menus;
    role.auth_name = memoryUtils.user.username;
    role.auth_time = formatDate(Date());
    const result = await reqUpdateRole(role);
    if (result.data.status === 0) {
      message.success("更新角色成功");
      this.setState({ roles: [...this.state.roles], isShowAuth: false });
    } else {
      message.error("更新角色失败");
      this.setState({ isShowAuth: false });
    }
  };

  constructor(props) {
    super(props);
    this.intitColums();
    this.auth = React.createRef(); //创建ref容器
  }
  //发送ajax请求获取角色列表
  componentDidMount() {
    this.getRoles();
  }

  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state;
    // console.log(isShowAdd);
    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => {
            this.setState({ isShowAdd: true });
          }}
        >
          创建角色
        </Button>
        &nbsp;&nbsp;
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => {
            this.setState({ isShowAuth: true });
          }}
        >
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
        <Modal
          title="创建角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false });
            this.form.resetFields();
          }}
          destroyOnClose //关闭对话框时重置
        >
          <AddForm setForm={(form) => (this.form = form)} />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false });
          }}
          destroyOnClose //关闭对话框时重置
        >
          <AuthForm role={role} ref={this.auth} />
        </Modal>
      </Card>
    );
  }
}
