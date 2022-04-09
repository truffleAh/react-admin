import React, { Component } from "react";
import { Card, Form, Input, Cascader, Upload, Button } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-buttton";
import { reqCategories } from "../../api/index";
const { Item } = Form;
const { TextArea } = Input;

export default class ProductAddUpdate extends Component {
  state = { options: [] };

  handleSubmit = () => {};
  /* 自定义验证器中的验证价格函数 */
  validatePrice = async (rull, value, callback) => {
    if (value > 0) {
      return Promise.resolve();
    } else {
      return Promise.reject("请输入正确的价格！");
    }
  };
  /* 用于加载下一级列表的回调函数 */
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: "dynamic1",
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2",
        },
      ];
      this.setState({ options: [...this.state.options] });
    }, 1000);
  };
  /* 根据categories数组生成options数组,并更新状态 */
  initOptions = (categories) => {
    const options = categories.map((item) => ({
      value: item._id,
      label: item.name,
      isLeaf: false,
    }));
    this.setState({ options });
  };

  getCategories = async (parentId) => {
    const result = await reqCategories(parentId);
    // console.log(result);
    if (result.data.status === 0) {
      const categories = result.data.data;
      this.initOptions(categories);
    }
  };
  /* 注意不要缺少这步 */
  componentDidMount() {
    this.getCategories("0");
  }

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
            <Cascader
              options={this.state.options} //需要显示的列表数据
              loadData={this.loadData} //当选择某个列表项时,加载下一级列表的监听回调
            />
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
