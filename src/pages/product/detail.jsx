import React, { Component } from "react";
import { Card, List } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import lenovo1 from "../../assets/imgs/ThinkPadE480正面.jpg";
import lenovo2 from "../../assets/imgs/ThinkPadE480侧面.jpg";
const Item = List.Item;

export default class ProductDetail extends Component {
  render() {
    const title = (
      <span>
        <LeftCircleOutlined />
        &nbsp;&nbsp;
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>联想ThinkPad 翼480</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>年度重量级新品 X390、T490全新登场 更加轻薄机身设计</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>￥6999</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>电脑 --{">"} 笔记本</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              <img src={lenovo1} alt="product-img" className="product-img" />
              <img src={lenovo2} alt="product-img" className="product-img" />
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span
              className="innerHTML"
              dangerouslySetInnerHTML={{
                __html: "<h1 style={color:red}>商品详情的内容标题</h1>",
              }}
            ></span>
          </Item>
        </List>
      </Card>
    );
  }
}
