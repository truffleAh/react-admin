import {
  HomeOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ToolOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    title: "首页",
    key: "/home",
    icon: <HomeOutlined />,
  },
  {
    title: "商品",
    key: "/products",
    icon: <AppstoreOutlined />,
    children: [
      {
        title: "品类管理",
        key: "/products/category",
        icon: <MenuUnfoldOutlined />,
      },
      {
        title: "商品管理",
        key: "/products/product",
        icon: <ToolOutlined />,
      },
    ],
  },
  {
    title: "用户管理",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "角色管理",
    key: "/role",
    icon: <SafetyOutlined />,
  },
  {
    title: "图形图表",
    key: "/charts",
    icon: <AreaChartOutlined />,
    children: [
      {
        title: "柱状图",
        key: "/charts/bar",
        icon: <BarChartOutlined />,
      },
      {
        title: "折线图",
        key: "/charts/line",
        icon: <LineChartOutlined />,
      },
      {
        title: "饼图",
        key: "/charts/pie",
        icon: <PieChartOutlined />,
      },
    ],
  },
];

export default menuList;
