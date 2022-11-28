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
  selectedKeys: string[];
  openKeys: string[];
  setOpenKeys: (value: string[]) => void;
}) {
  // @ts-ignore
  function deepTree(list: MenuItem[]) {
    return list.map((item: MenuItem) => {
      if (item?.children) {
        item.children = deepTree(item.children);
      }
      return getItem(item.label, item.key, item.icon, item?.children);
    });
  }
  const items: MenuItem[] = deepTree(props.routers);

  // console.log(items, "items");

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
        selectedKeys={props.selectedKeys}
        onClick={e => props.setOpenKeys([e.key])}
        // openKeys={props.openKeys}
        defaultOpenKeys={props.openKeys}
      />
    </LayoutAntd.Sider>
  );
}
