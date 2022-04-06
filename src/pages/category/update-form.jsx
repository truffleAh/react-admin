import React, { Component } from "react";
import { Form, Input } from "antd";
import propTypes from "prop-types";

const { Item } = Form;

export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: propTypes.string.isRequired,
  };

  formRef = React.createRef();

  componentDidMount() {
    // console.log(this.formRef, this.props);
    this.props.setForm(this.formRef.current);
  }

  render() {
    const { categoryName } = this.props;

    return (
      <Form ref={this.formRef}>
        <Item
          name="categoryName"
          rules={[{ required: true, message: "请输入分类名称" }]}
        >
          <Input placeholder="请输入分类名称" defaultValue={categoryName} />
        </Item>
      </Form>
    );
  }
}
