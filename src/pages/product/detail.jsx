import React, { Component } from "react";
import { Card, List } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
// import lenovo1 from "../../assets/imgs/ThinkPadE480正面.jpg";
// import lenovo2 from "../../assets/imgs/ThinkPadE480侧面.jpg";
import LinkButton from "../../components/link-buttton";
import { BASE_IMG_URL } from "../../utils/constants";
import { reqCategory } from "../../api/index";
const Item = List.Item;

export default class ProductDetail extends Component {
  state = {
    cName1: "", //一级分类名称
    cName2: "", //二级分类名称
  };

  async componentDidMount() {
    const { pCategoryId, categoryId } = this.props.location.state;
    if (pCategoryId === "0") {
      const result = await reqCategory(categoryId);
      const cName1 = result.data.data.name;
      this.setState({ cName1 });
    } else {
      /* 1.通过多个await发送多个请求,后面请求在前一个请求成功返回之后才发送,效率低 */
      // const res1 = await reqCategory(pCategoryId);
      // const res2 = await reqCategory(categoryId);
      // console.log(res2);
      /* 2.一次性同时发送多个请求,只有都成功了,才处理后续 */
      const results = await Promise.all([
        reqCategory(pCategoryId),
        reqCategory(categoryId),
      ]);
      const cName1 = results[0].data.data.name;
      const cName2 = results[1].data.data.name;
      this.setState({ cName1, cName2 });
    }
  }

  render() {
    const { name, desc, price, detail, imgs } = this.props.location.state;
    // console.log(this.props.location.state, imgs);
    const { cName1, cName2 } = this.state;
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
        &nbsp;&nbsp;
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>￥{price}</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>
              {cName1} {cName2 ? "-->" + cName2 : ""}
            </span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {imgs.map((img) => (
                <img
                  key={img}
                  className="product-img"
                  src={BASE_IMG_URL + img}
                  alt="img"
                />
              ))}
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span
              className="innerHTML"
              dangerouslySetInnerHTML={{
                __html: detail,
              }}
            ></span>
          </Item>
        </List>
      </Card>
    );
  }
}
