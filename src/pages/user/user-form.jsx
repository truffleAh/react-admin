import React, { Component } from "react";
import { Form, Input, Select } from "antd";
const { Item } = Form;
const { Option } = Select;

export default class UserForm extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.props.setForm(this.formRef.current);
  }

  render() {
    const { user, roles } = this.props;
    // console.log(user);
    const layout = {
      labelCol: { span: 3 }, // 左侧label的宽度
      wrapperCol: { span: 20 }, // 右侧包裹的宽度
    };
    return (
      <Form {...layout} ref={this.formRef}>
        <Item label="用户名" name="username" initialValue={user.username}>
          <Input placeholder="请输入用户名" />
        </Item>
        {user._id ? null : (
          <Item label="密码" name="password" initialValue={user.password}>
            <Input.Password type="password" placeholder="请输入密码" />
          </Item>
        )}
        <Item label="角色" name="role_id" initialValue={user.role_id}>
          <Select placeholder="请选择">
            {roles.map((role) => (
              <Option key={role._id} value={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="手机号" name="phone" initialValue={user.phone}>
          <Input placeholder="请输入手机号" />
        </Item>
        <Item label="邮箱" name="email" initialValue={user.email}>
          <Input placeholder="请输入邮箱" />
        </Item>
      </Form>
    );
  }
}
