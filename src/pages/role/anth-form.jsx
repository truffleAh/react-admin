import React, { Component } from "react";
import { Form, Select, Input, Tree } from "antd";
const { Item } = Form;

export default class AuthForm extends Component {
  onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  onCheck = (checkedKeys, info) => {
    // console.log("onCheck", checkedKeys, info);
    this.setState({ checkedKeys });
  };
  //准备数据,只渲染一次treeData
  constructor(props) {
    super(props);
    this.treeData = [
      {
        title: "平台权限",
        key: "all",
        children: [
          {
            title: "首页",
            key: "/home",
          },
          {
            title: "商品",
            key: "/products",
            disabled: false,
            children: [
              {
                title: "品类管理",
                key: "/products/category",
                disableCheckbox: false,
              },
              {
                title: "商品管理",
                key: "/products/product",
              },
            ],
          },
          {
            title: "用户管理",
            key: "/user",
          },
          {
            title: "角色管理",
            key: "/role",
          },
          {
            title: "图形图表",
            key: "/charts",
            children: [
              {
                title: "柱形图",
                key: "/charts/bar",
              },
              {
                title: "折线图",
                key: "/charts/line",
              },
              {
                title: "饼图",
                key: "/charts/pie",
              },
            ],
          },
        ],
      },
    ];
    //根据当前选中role的menus生成初始状态
    const { menus } = this.props.role;
    this.state = {
      checkedKeys: menus,
    };
  }
  //为父组件role获得当前选中role的最新menus权限列表的方法
  getMenus = () => this.state.checkedKeys;

  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;

    return (
      <>
        <Form>
          <Item label="角色名称">
            <Input value={role.name} disabled />
          </Item>
        </Form>
        <Tree
          checkable
          defaultExpandedKeys={["all", "/products/category", "/charts"]}
          defaultSelectedKeys={[]}
          defaultCheckedKeys={[]}
          checkedKeys={checkedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          treeData={this.treeData}
        />
      </>
    );
  }
}
