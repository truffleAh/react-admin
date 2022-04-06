import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";
const { Item } = Form;
const { Option } = Select;

export default class AddForm extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
  };

  formRef = React.createRef();

  componentDidMount() {
    this.props.setForm(this.formRef.current);
  }

  render() {
    const { categories, parentId } = this.props;
    return (
      <Form ref={this.formRef}>
        <Item initialValue={parentId} name="parentId">
          <Select>
            <Option value="0">一级分类</Option>
            {categories.map((c) => (
              <Option value={c._id} key={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          name="categoryName"
          // rules={[{ required: true, message: "请输入分类名称" }]}
        >
          <Input placeholder="请输入分类名称" />
        </Item>
      </Form>
    );
  }
}
