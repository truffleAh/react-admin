import React, { Component } from "react";
import { Card, Form, Input, Cascader, Button } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-buttton";
import { reqCategories } from "../../api/index";
import PicturesWall from "./pictures-wall";
const { Item } = Form;
const { TextArea } = Input;

export default class ProductAddUpdate extends Component {
  state = { options: [] };
  /* 对收集到的表单数据进行处理 */
  handleSubmit = (values) => {
    console.log(values);
  };
  /* 自定义验证器中的验证价格函数 */
  validatePrice = async (rull, value, callback) => {
    if (value > 0) {
      return Promise.resolve();
    } else {
      return Promise.reject("请输入正确的价格！");
    }
  };
  /* 用于加载下一级列表的回调函数 */
  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    //根据选中的分类,请求获取二级分类列表
    const subCategories = await this.getCategories(targetOption.value);
    targetOption.loading = false;

    if (subCategories && subCategories.length > 0) {
      //生成一个二级列表的options
      const subOptions = subCategories.map((item) => ({
        value: item._id,
        label: item.name,
        isLeaf: true,
      }));
      targetOption.children = subOptions;
    } else {
      //当前选中的分类没有二级子分类
      targetOption.isLeaf = true;
    }
    this.setState({ options: [...this.state.options] });
  };
  /* 根据categories数组生成options数组,并更新状态 */
  initOptions = async (categories) => {
    const options = categories.map((item) => ({
      value: item._id,
      label: item.name,
      isLeaf: false,
    }));
    //若是二级分类商品的更新
    const { isUpdate, product } = this;
    const { pCategoryId, categoryId } = product;
    if (isUpdate && pCategoryId !== "0") {
      //获取对应的二级分类列表
      const subCategories = await this.getCategories(pCategoryId);
      //生成二级下拉列表
      const subOptions = subCategories.map((item) => ({
        value: item._id,
        label: item.name,
        isLeaf: true,
      }));
      //找到当前商品对应的一级分类对象
      const targetOption = options.find(
        (option) => option.value === pCategoryId
      );
      //关联到对应的一级分类对象
      targetOption.children = subOptions;
    }
    this.setState({ options });
  };

  /* 异步获取一级/二级分类列表 */
  getCategories = async (parentId) => {
    const result = await reqCategories(parentId);
    // console.log(result);
    if (result.data.status === 0) {
      const categories = result.data.data;
      //若是一级分类列表
      if (parentId === "0") {
        this.initOptions(categories);
      } else {
        //二级分类列表
        return categories;
      }
    }
  };

  constructor(props) {
    super(props);
    //如果是添加商品则没值,修改商品则有值
    const product = this.props.location.state;
    this.isUpdate = !!product; //2个!强制转布尔类型值
    this.product = product || {};
  }

  /* 注意不要缺少这步 */
  componentDidMount() {
    this.getCategories("0");
  }

  render() {
    const { isUpdate, product } = this;
    /* 实现修改商品页面默认分类的选中效果 */
    const { categoryId, pCategoryId } = product;
    const categoryIds = [];
    if (isUpdate) {
      //商品是一级分类商品
      if (pCategoryId === "0") {
        categoryIds.push(categoryId);
      } else {
        //商品是二级分类商品
        categoryIds.push(pCategoryId);
        categoryIds.push(categoryId);
      }
    }

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
        &nbsp; {isUpdate ? "修改商品" : "添加商品"}
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
            name: product.name,
            desc: product.desc,
            price: product.price,
            categoryIds: categoryIds,
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
          <Item
            label="商品分类"
            name="categoryIds"
            rules={[{ required: true, message: "必须指定商品分类" }]}
          >
            <Cascader
              options={this.state.options} //需要显示的列表数据
              loadData={this.loadData} //当选择某个列表项时,加载下一级列表的监听回调
              placeholder="请选择"
            />
          </Item>
          <Item label="商品图片">
            <PicturesWall />
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
