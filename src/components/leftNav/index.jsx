import React, { Component } from "react";
import "./index.less";
import logo from "../../assets/imgs/logo.png"; //注意jsx中引入图片的方式
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;
/* 左侧导航组件 */

class LeftNav extends Component {
  /* 根据menuList数据动态生成leftNav菜单内容,
  方便后续权限管理(不同用户的权限操作不同,不能写死菜单项)
  实现方法：map()函数【也可用reduce()函数】 + 递归调用 */
  getMenuNodes = (menuList) => {
    //得到当前请求的路由路径
    const path = this.props.location.pathname;

    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        //查找一个与当前请求路径匹配的子路径
        const cItem = item.children.find((cItem) => cItem.key === path);
        if (cItem) {
          this.openKey = item.key;
        }

        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {/* 递归调用,显示subMenu的菜单项 */}
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };
  /* 在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的) */
  constructor(props) {
    super(props);
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    // debugger
    //得到当前请求的路由路径,实现刷新时依然自动选中当前菜单项
    const path = this.props.location.pathname;
    const openKey = this.openKey;

    return (
      <div>
        <div className="left-nav">
          <Link to="/" className="left-nav-header">
            <img src={logo} alt="logo" />
            <h1>硅谷后台</h1>
          </Link>
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[path]}
            defaultOpenKeys={[openKey]}
          >
            {this.menuNodes}
          </Menu>
        </div>
      </div>
    );
  }
}
/* withRouter是高阶组件,用于包装非路由组件,返回一个新组件,
新组件具有路由组件的3大属性：history，location，match */
export default withRouter(LeftNav);
