import React from "react";
import { Layout as LayoutAntd, Menu, MenuProps } from "antd";
import { Logo } from "@/components/Layout/Logo";
import { Link } from "react-router-dom";
import { MenuItem } from "./layout";
type MenuItemAntd = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItemAntd[]
): MenuItemAntd {
  return {
    label: Array.isArray(children) ? label : <Link to={key}>{label}</Link>,
    key,
    icon,
    children,
  } as MenuItemAntd;
}

export function Slider(props: {
  routers: MenuItem[];
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
  defaultOpenKeys: string[];
  defaultSelectedKeys: string[];
}) {
  // const items: MenuItemAntd[] = [
  //   getItem("Dashboard", "dashboard", <PieChartOutlined />),
  //   getItem("User", "user", <DesktopOutlined />),
  //   getItem("System Management", "systemManagement", <UserOutlined />, [
  //     getItem("User Management", "systemManagement/userManagement"),
  //     getItem("Role Management", "systemManagement/roleManagement"),
  //   ]),
  // ];

  function deepTree(list: MenuItem[]) {
    list.map((item: MenuItem) => {
      if (item?.children) {
        console.log(deepTree(item.children));
        item.children = deepTree(item.children);
      }
      return getItem(item.label, item.key, item.icon);
    });
    return list;
  }

  const items: MenuItem[] = deepTree(props.routers);

  console.log(items);

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
        // selectedKeys={props.defaultOpenKeys}
        defaultSelectedKeys={props.defaultSelectedKeys}
      />
    </LayoutAntd.Sider>
  );
}
