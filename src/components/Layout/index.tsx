import { Layout as LayoutAntd } from "antd";
import React, { useState } from "react";
import { useLocationListen } from "@/common/hooks";
import { Slider } from "@/components/Layout/Slider";
import { Header } from "@/components/Layout/Header";
import { Content } from "@/components/Layout/Content";
import { Footer } from "@/components/Layout/Footer";
import { useSelector } from "react-redux";
import { IUserInitialState } from "@/store/reducers/user";

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([""]);
  const { user } = useSelector(state => state) as { user: IUserInitialState };
  useLocationListen(location => {
    const { pathname } = location;
    let temp = pathname.split("/").filter(item => item);
    // setSelectedKeys([temp.join("/")]);
    setSelectedKeys([temp.at(-1)!]);
  });
  return (
    <LayoutAntd style={{ minHeight: "100vh" }}>
      <Slider
        routers={user.menu}
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        setOpenKeys={setOpenKeys}
      />
      <LayoutAntd>
        <Header />
        <Content />
        <Footer />
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
