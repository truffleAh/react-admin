import React, { Component } from "react";
import { Form, Input } from "antd";
import propTypes from "prop-types";

const { Item } = Form;

export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: propTypes.string.isRequired,
  };

  render() {
    const { categoryName } = this.props;

    return (
      <Form>
        <Item>
          <Input placeholder="请输入分类名称" defaultValue={categoryName} />
        </Item>
      </Form>
    );
  }
}
