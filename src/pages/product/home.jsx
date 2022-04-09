import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-buttton";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";
const Option = Select.Option;
/* Product的默认子路由组件 */

export default class ProductHome extends Component {
  state = {
    products: [],
    total: 0, //商品总数量
    loading: false,
    searchName: "", //搜索关键字
    searchType: "productName", //搜索类型,默认为按名称搜索
  };
  /* 初始化表格列 */
  initColums = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: (price) => "￥" + price,
      },
      {
        title: "状态",
        // dataIndex: "status",
        width: 100,
        render: (product) => {
          const { status, _id } = product;
          return (
            <span>
              <Button
                type="primary"
                onClick={() => {
                  this.updateStatus(_id, status === 1 ? 2 : 1);
                }}
              >
                {status === 1 ? "下架" : "上架"}
              </Button>
              <span>{status === 1 ? "在售" : "已下架"}</span>
            </span>
          );
        },
      },
      {
        title: "操作",
        width: 100,
        render: (product) => {
          return (
            <span>
              <LinkButton
                onClick={() => {
                  /* 将product对象作为state参数传递给目标路由组件 */
                  this.props.history.push("/products/product/detail", product);
                }}
              >
                详情
              </LinkButton>
              <LinkButton
                onClick={() =>
                  this.props.history.push(
                    "/products/product/addUpdate",
                    product
                  )
                }
              >
                修改
              </LinkButton>
            </span>
          );
        },
      },
    ];
  };
  /* 获取指定页码的列表数据显示 */
  getProducts = async (pageNum) => {
    this.setState({ loading: true }); //显示loading
    const { searchName, searchType } = this.state;
    let result;
    //如果searchName有值,进行搜索分页
    if (searchName) {
      result = await reqSearchProducts(
        pageNum,
        PAGE_SIZE,
        searchName,
        searchType
      );
    } else {
      //一般分页请求
      result = await reqProducts(pageNum, PAGE_SIZE);
    }
    this.setState({ loading: false }); //隐藏loading
    // console.log(result);
    if (result.data.status === 0) {
      const { total, list } = result.data.data;
      this.setState({ total, products: list });
    }
  };

  /* 更新指定商品的状态 */
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status);
    // console.log(result);
    if (result.data.status === 0) {
      message.success("更新商品成功");
      this.getProducts(1);
    }
  };

  constructor(props) {
    super(props);
    this.initColums();
  }

  componentDidMount() {
    this.getProducts(1);
  }

  render() {
    const { products, total, loading, searchType, searchName } = this.state;

    const title = (
      <span>
        <Select
          value={searchType}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: 200, margin: "0 15px" }}
          value={searchName}
          onChange={(event) =>
            this.setState({ searchName: event.target.value })
          }
        />
        <Button
          type="primary"
          onClick={() => {
            this.getProducts(1);
          }}
        >
          搜索
        </Button>
      </span>
    );
    const extra = (
      <Button
        type="primary"
        onClick={() => {
          this.props.history.push("/products/product/addUpdate");
        }}
      >
        <PlusOutlined />
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          bordered
          dataSource={products}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            total,
            showQuickJumper: true,
            //翻页事件监听,获取当前分页数据
            onChange: this.getProducts,
          }}
          loading={loading}
        />
      </Card>
    );
  }
}
