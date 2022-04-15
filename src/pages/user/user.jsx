import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import UserForm from "./user-form";
import { reqUsers, reqAddOrUpdateUser, reqDeleteUser } from "../../api/index";
import { formatDate } from "../../utils/dateUtils";
import LinkButton from "../../components/link-buttton";

export default class User extends Component {
  state = { isShow: false, users: [], roles: [] };

  initColumns = () => {
    this.columns = [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "邮箱",
        dataIndex: "email",
      },
      {
        title: "电话",
        dataIndex: "phone",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        render: formatDate,
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        render: (role_id) =>
          // this.state.roles.find((role) => role._id === role_id).name,
          this.roleNames[role_id],
      },
      {
        title: "操作",
        render: (user) => (
          <span>
            <LinkButton
              onClick={() => {
                this.showUpdate(user);
              }}
            >
              修改
            </LinkButton>
            <LinkButton
              onClick={() => {
                this.deleteUser(user);
              }}
            >
              删除
            </LinkButton>
          </span>
        ),
      },
    ];
  };
  /* 根据roles数组生成包含所有用户的role_id对应的角色名的key-value数组对象,
  提高initColumns的查询效率.注意用reduce因为要生成对象,而map是生成一个新数组 */
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    this.roleNames = roleNames;
  };

  getUsers = async () => {
    const result = await reqUsers();
    // console.log(result);
    if (result.data.status === 0) {
      message.success("获取用户列表成功");
      const { users, roles } = result.data.data;
      this.initRoleNames(roles);
      this.setState({ users, roles });
    } else {
      message.error("获取用户列表失败");
    }
  };
  // 显示修改对话框
  showUpdate = (user) => {
    this.user = user; //保存当前user
    // console.log(user);
    this.setState({ isShow: true });
  };
  //显示创建用户对话框
  showAdd = () => {
    this.user = null; //去掉已保存的user(若有)
    this.setState({ isShow: true });
  };

  addOrUpdateUser = async () => {
    this.form.validateFields().then(async (values) => {
      /* 1.隐藏对话框 */
      this.setState({ isShow: false });
      // console.log(values);
      /* 2.收集数据 */
      const user = values;
      //如果是更新,需指定_id.创建新users时values里没有_id,发完ajax请求才会生成_id
      if (this.user) {
        user._id = this.user._id;
      }
      /* 3.发送ajax请求,修改数据库 */
      const result = await reqAddOrUpdateUser(user);
      console.log(result);
      this.form.resetFields();
      if (result.data.status === 0) {
        message.success(`${this.user ? "修改" : "创建"}成功`);
        this.getUsers();
      } else {
        message.error(`${this.user ? "修改" : "创建"}失败`);
      }
    });
  };

  deleteUser = async (user) => {
    Modal.confirm({
      title: `确认删除【${user.name}】吗`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id);
        console.log(result);
        if (result.data.status === 0) {
          message.success("删除用户成功");
          this.getUsers();
        } else {
          message.error("删除用户失败");
        }
      },
    });
  };

  constructor(props) {
    super(props);
    this.initColumns();
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => {
            this.showAdd();
          }}
        >
          创建用户
        </Button>
      </span>
    );
    const { isShow, users, roles } = this.state;
    const user = this.user || {};
    return (
      <Card title={title}>
        <Table
          dataSource={users}
          columns={this.columns}
          bordered
          rowKey="_id"
          pagination={{ defaultPageSize: 5 }}
          onRow={this.onRow}
        ></Table>
        <Modal
          title={user._id ? "修改用户" : "创建用户"}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.setState({ isShow: false });
          }}
          destroyOnClose //关闭对话框时重置
        >
          <UserForm
            setForm={(form) => (this.form = form)}
            user={user}
            roles={roles}
          />
        </Modal>
      </Card>
    );
  }
}
