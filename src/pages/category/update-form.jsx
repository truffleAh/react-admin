import React, { Component } from "react";
import { Form, Select, Input } from "antd";
const { Item } = Form;

export default class UpdateForm extends Component {
  render() {
    return (
      <Form>
        <Item>
          <Input placeholder="请输入分类名称" />
        </Item>
      </Form>
    );
  }
}
