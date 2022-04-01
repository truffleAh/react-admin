import React, { Component } from "react";
import { Form, Select, Input } from "antd";
const { Item } = Form;
const { Option } = Select;

export default class AddForm extends Component {
  render() {
    return (
      <Form>
        <Item>
          <Select defaultValue="一级分类">
            <Option value="1">家用电器</Option>
            <Option value="2">手机</Option>
          </Select>
        </Item>
        <Item>
          <Input placeholder="请输入分类名称" />
        </Item>
      </Form>
    );
  }
}
