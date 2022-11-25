import { Layout as LayoutAntd } from "antd";
import React, { useEffect, useState } from "react";
import { useLocationListen } from "@/common/hooks";
import { Slider } from "@/components/Layout/Slider";
import { Header } from "@/components/Layout/Header";
import { Content } from "@/components/Layout/Content";
import { Footer } from "@/components/Layout/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
  const { user } = useSelector(state => state) as { user: { token: string } };
  const navigator = useNavigate();

  useLocationListen(location => {
    const { pathname } = location;
    let temp = pathname.split("/").filter(item => item);
    setDefaultSelectedKeys([temp.join("/")]);
    setDefaultOpenKeys([temp[0]]);
  });

  useEffect(() => {
    if (!user.token) navigator("/login");
  }, []);
  return (
    <LayoutAntd style={{ minHeight: "100vh" }}>
      <Slider
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
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
