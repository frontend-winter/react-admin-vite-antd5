import React from "react";
import { Layout as LayoutAntd, Menu, MenuProps } from "antd";
import { Logo } from "@/components/Layout/Logo";
import { Link } from "react-router-dom";
import { MenuItem } from "./layout";
import { baseRouterList } from "@/routes";
type MenuItemAntd = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: string,
  path: string,
  icon?: React.ReactNode,
  children?: MenuItemAntd[]
): MenuItemAntd {
  return {
    label: (
      <Link key={key} to={path}>
        {label}
      </Link>
    ),
    key,
    path,
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
  function deepTree(list: MenuItem[]): any[] {
    return list.map((item: MenuItem) => {
      if (item?.children) {
        return {
          ...item,
          children: item.children.map(child => {
            return getItem(
              child.label,
              child.key,
              item.path + "/" + child.path,
              child?.icon,
              child?.children
            );
          }),
        };
      }
      return getItem(
        item.label,
        item.key,
        item.path,
        item?.icon,
        item?.children
      );
    });
  }

  const items: MenuItem[] = deepTree([...baseRouterList, ...props.routers]);

  // console.log(items, "items");

  return (
    <LayoutAntd.Sider
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
      width={240}
    >
      <Logo collapsed={props.collapsed} />
      {items.length > 0 && (
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={props.selectedKeys}
          onClick={e => props.setOpenKeys([e.key])}
          // openKeys={props.openKeys}
          defaultOpenKeys={props.openKeys}
        />
      )}
    </LayoutAntd.Sider>
  );
}
