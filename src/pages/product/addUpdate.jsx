import React, { Component } from "react";
import { Card, Form, Input, Cascader, Upload, Button } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-buttton";
const { Item } = Form;
const { TextArea } = Input;

export default class ProductAddUpdate extends Component {
  handleSubmit = () => {};
  /* 自定义验证器中的验证价格函数 */
  validatePrice = async (rull, value, callback) => {
    if (value > 0) {
      return Promise.resolve();
    } else {
      return Promise.reject("请输入正确的价格！");
    }
  };

  render() {
    const title = (
      <span>
        <LinkButton>
          <LeftCircleOutlined
            style={{ fontSize: 20 }}
            onClick={() => {
              this.props.history.goBack();
            }}
          />
        </LinkButton>
        &nbsp; 添加商品
      </span>
    );
    /* 指定Form.Item布局的配置对象 */
    const layout = {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 8,
      },
    };

    return (
      <Card title={title}>
        <Form
          {...layout}
          initialValues={{
            remember: true,
            name: "",
            desc: "",
            price: "",
          }}
          onFinish={this.handleSubmit}
        >
          <Item
            label="商品名称"
            name="name"
            rules={[{ required: true, message: "必须输入商品名称！" }]}
          >
            <Input placeholder="请输入商品名称" />
          </Item>
          <Item
            label="商品描述"
            name="desc"
            rules={[{ required: true, message: "必须输入商品名称！" }]}
          >
            <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 3 }} />
          </Item>
          <Item
            label="商品价格"
            name="price"
            rules={[
              { required: true, message: "必须输入商品价格！" },
              { validator: this.validatePrice },
            ]}
          >
            <Input prefix="￥" suffix="RMB" />
          </Item>
          <Item label="商品分类">
            <div>商品分类</div>
          </Item>
          <Item label="商品图片">
            <div>商品图片</div>
          </Item>
          <Item label="商品详情">
            <div>商品详情</div>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}
