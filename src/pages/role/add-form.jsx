import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";
const { Item } = Form;

export default class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
  };

  formRef = React.createRef();

  componentDidMount() {
    this.props.setForm(this.formRef.current);
  }

  render() {
    return (
      <Form ref={this.formRef}>
        <Item
          label="角色名称"
          name="roleName"
          rules={[{ required: true, message: "请输入角色名称" }]}
        >
          <Input placeholder="请输入角色名称" />
        </Item>
      </Form>
    );
  }
}
