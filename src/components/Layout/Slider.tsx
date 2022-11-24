import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import React from "react";
import { Layout as LayoutAntd, Menu, MenuProps } from "antd";
import { Logo } from "@/components/Layout/Logo";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={key}>{label}</Link>
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("dashboard", "dashboard", <PieChartOutlined />),
  getItem("user", "user", <DesktopOutlined />)
  // getItem("User", "sub1", <UserOutlined />, [
  //   getItem("Tom", "3"),
  //   getItem("Bill", "4"),
  //   getItem("Alex", "5")
  // ]),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8")
  // ]),
  // getItem("Files", "9", <FileOutlined />)
];

export function Slider(props: { collapsed: boolean, onCollapse: (value: boolean) => void, defaultOpenKeys: string[], selectedKeys: string[] }) {
  return <LayoutAntd.Sider
    collapsible
    collapsed={props.collapsed}
    onCollapse={props.onCollapse}
  >
    <Logo collapsed={props.collapsed} />
    <Menu
      theme="dark"
      mode="inline"
      items={items}
      defaultOpenKeys={props.defaultOpenKeys}
      selectedKeys={props.selectedKeys}
    />
  </LayoutAntd.Sider>;
}