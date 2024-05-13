import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BankOutlined,
  RightCircleOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import logo from "../../assets/images/QMSLogo.PNG";
import FooterComponent from "./_components/Footer";
import HeaderComponent from "./_components/Header";

export default function Header() {
  const { Header, Content, Footer, Sider } = Layout;
  
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    to?: string
  ): MenuItem | null {
    if (to && children?.length === 0) {
      return {
        key,
        icon,

        label: <Link to={to}>{label}</Link>,
      } as MenuItem;
    } else {
      if (to && children !== null) {
        return {
          key,
          icon,
          children,
          label: <Link to={to}>{label}</Link>,
        } as MenuItem;
      } else {
        return {
          key,
          icon,
          children,
          label,
        } as MenuItem;
      }
    }
  }

  const items: MenuItem[] = [
    getItem("Dashboard", "1", <PieChartOutlined />, [], "/home/index"),
    getItem("Factory", "2", <BankOutlined />, [
      getItem("Factory A01", "3", <RightCircleOutlined />, [], "FactoryA01"),
      getItem("Factory A02", "5", <RightCircleOutlined />, [], "FactoryA02"),
      getItem("Factory A08", "6", <RightCircleOutlined />,[], "FactoryA08"),
      getItem("Factory B05", "7", <RightCircleOutlined />,[], "FactoryB05"),
      getItem("Factory B06", "8", <RightCircleOutlined />,[], "FactoryB06"),
      getItem("Factory C03", "9", <RightCircleOutlined />,[], "FactoryC03"),
      getItem("Factory C07", "10", <RightCircleOutlined />,[], "FactoryC07"),
    ]),
    // getItem("User", "sub1", <UserOutlined />, [
    //   getItem("Tom", "3"),
    //   getItem("Bill", "4"),
    //   getItem("Alex", "5"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //   getItem("Team 1", "6"),
    //   getItem("Team 2", "8"),
    // ]),
    // getItem("Files", "9", <FileOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
      setCollapsed(isMobile);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical">
          <img src={logo} alt="logo" style={{ width: "100%" }} />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <HeaderComponent></HeaderComponent>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <FooterComponent></FooterComponent>
      </Layout>
    </Layout>
  );
}
