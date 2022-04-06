import { Button, Card, Table, Space, message, Modal } from "antd";
import React, { Component } from "react";
import { PlusOutlined, RightSquareOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-buttton/index";
import "./index.less";
import {
  reqCategories,
  reqUpdateCategory,
  reqAddCategory,
} from "../../api/index";
import AddForm from "./add-form";
import UpdateForm from "./update-form";

export default class Category extends Component {
  state = {
    loading: false,
    categories: [],
    subCategories: [], //二级子分类列表
    parentId: "0", //当前分类列表的父类Id
    parentName: "", //当前子分类列表的父类名称
    visibleStatus: 0, //对话框是否显示,设0表示都不显示,1表示显示添加,2显示更新对话框
  };

  /* 初始化Table所有列 */
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
      },

      {
        title: "操作",
        width: 300,
        //每行都是一个category对象,将对象传到showSubCategories函数里
        render: (category) => (
          <Space size="middle">
            <LinkButton onClick={() => this.showUpdate(category)}>
              修改分类
            </LinkButton>
            {/*用箭头函数的形式定义异步事件回调函数,
            注意不要写成onClick={this.showSubCategories(categories)},
            因为它在初次渲染就会自动调用 */}
            {this.state.parentId === "0" ? (
              <LinkButton onClick={() => this.showSubCategories(category)}>
                查看子分类
              </LinkButton>
            ) : null}
          </Space>
        ),
      },
    ];
  };

  /* 异步获取一级或二级分类列表显示 */
  getCategories = async () => {
    //发请求前,显示loading转圈效果
    this.setState({ loading: true });
    const { parentId } = this.state;
    //发异步ajax请求获取数据,由于返回promise对象,用async+await阻塞获取
    const result = await reqCategories(parentId);
    // console.log(result, result.data.status);测试代码

    //请求完成后,去掉loading转圈效果
    this.setState({ loading: false });

    if (result.status === 200) {
      const categories = result.data.data;
      if (parentId === "0") {
        this.setState({ categories });
      } else {
        this.setState({ subCategories: categories });
      }
    } else {
      message.error("获取分类列表失败");
    }
  };

  /* 显示一级分类对象的二级子列表 */
  showSubCategories = (category) => {
    //this.setState是异步执行状态更新的,应在其回调函数中拿到更新后的状态进行操作
    this.setState({ parentId: category._id, parentName: category.name }, () => {
      // console.log(this.state.parentName, this.state.parentId);
      this.getCategories();
    });
  };
  /* 从二级分类子列表返回一级分类列表的回调函数 */
  showParentCategory = () => {
    //重置状态,返回一级分类列表
    this.setState({ parentId: "0", parentName: "", subCategories: [] });
  };
  /* 显示添加分类的对话框 */
  showAdd = () => {
    this.setState({ visibleStatus: 1 });
  };
  /* 显示更新分类的对话框 */
  showUpdate = (category) => {
    //保存分类对象
    this.category = category;
    //更新状态
    this.setState({ visibleStatus: 2 });
  };
  /* 响应对话框点击取消 */
  handleCancel = () => {
    this.setState({ visibleStatus: 0 });
  };
  /* 列表添加分类 */
  addCategory = () => {
    this.form
      .validateFields()
      .then(async (values) => {
        // 1.隐藏弹框
        this.setState({
          visibleStatus: 0,
        });
        // 2.收集数据，发送请求
        const { parentId, categoryName } = values;
        // console.log(parentId);
        // console.log(categoryName);
        const result = await reqAddCategory(categoryName, parentId);
        if (result.status === 200) {
          // 3.重新显示列表
          if (parentId === this.state.parentId) {
            // 如果添加的是当前分类下的列表，则刷新，其他分类的不刷新
            this.getCategories();
          } else if (parentId === "0") {
            // 在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示
            this.getCategories("0");
          }
        }
      })
      .catch((err) => {
        //console.log(err);
        message.err("请输入分类名称");
      });
  };

  /* 更新分类 */
  updateCategory = () => {
    // console.log('update',this.form);
    // 进行表单验证 只有通过才能验证
    this.form
      .validateFields()
      .then(async (values) => {
        // 1、隐藏显示框
        this.setState({
          visibleStatus: 0,
        });

        // 准备数据
        const categoryId = this.category._id;
        const { categoryName } = values;
        // console.log(categoryId, categoryName);
        // 清除输入文本框数据
        // this.form.resetFields();

        // 2、发请求更新分类
        const result = await reqUpdateCategory({ categoryId, categoryName });
        // 3、重新显示列表
        if (result.status === 200) {
          this.getCategories();
        }
      })
      .catch((err) => {
        message.info("请输入分类名称");
      });
  };

  // 为第一次render准备数据
  constructor(props) {
    super(props);
    /* colums数据不要放到render里,每次渲染都读取影响性能,作为属性挂到this上即可
    将数据初始化封装成一个函数,钩子中调用完成初始化即可,实现数据与逻辑分离 */
    this.initColumns();
  }
  //执行异步任务：发送异步ajax请求
  componentDidMount() {
    this.getCategories();
  }

  render() {
    const { parentId, loading, parentName, categories, subCategories } =
      this.state;
    //读取指定分类
    const category = this.category;

    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton
            onClick={() => {
              this.showParentCategory();
            }}
          >
            一级分类列表
          </LinkButton>
          &nbsp;
          <RightSquareOutlined />
          &nbsp;&nbsp;
          <span>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <PlusOutlined />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={parentId === "0" ? categories : subCategories}
          columns={this.columns}
          bordered
          rowKey="_id"
          pagination={{ defaultPageSize: 5 }}
          loading={loading}
        />

        <Modal
          title="添加分类"
          visible={this.state.visibleStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
          destroyOnClose //关闭对话框时重置
        >
          <AddForm
            categories={categories}
            parentId={parentId}
            setForm={(form) => (this.form = form)}
          />
        </Modal>

        <Modal
          title="更新分类"
          visible={this.state.visibleStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
          destroyOnClose //关闭对话框时重置
        >
          <UpdateForm
            categoryName={category ? category.name : ""}
            setForm={(form) => (this.form = form)}
          />
        </Modal>
      </Card>
    );
  }
}
