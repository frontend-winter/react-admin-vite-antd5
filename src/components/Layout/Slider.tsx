import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
    label: Array.isArray(children) ? label : <Link to={key}>{label}</Link>,
    key,
    icon,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem("User", "user", <DesktopOutlined />),
  getItem("System Management", "systemManagement", <UserOutlined />, [
    getItem("User Management", "systemManagement/userManagement"),
    getItem("Role Management", "systemManagement/roleManagement"),
  ]),
];

export function Slider(props: {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
  defaultOpenKeys: string[];
  defaultSelectedKeys: string[];
}) {
  return (
    <LayoutAntd.Sider
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
      width={240}
    >
      <Logo collapsed={props.collapsed} />
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        defaultOpenKeys={props.defaultOpenKeys}
        selectedKeys={props.defaultOpenKeys}
        defaultSelectedKeys={props.defaultSelectedKeys}
      />
    </LayoutAntd.Sider>
  );
}
