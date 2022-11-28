import { Layout as LayoutAntd } from "antd";
import React, { useEffect, useState } from "react";
import { useLocationListen } from "@/common/hooks";
import { Slider } from "@/components/Layout/Slider";
import { Header } from "@/components/Layout/Header";
import { Content } from "@/components/Layout/Content";
import { Footer } from "@/components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUserInitialState } from "@/store/reducers/user";
import { DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { setMenu } from "@/store/actions";
import { MenuItem } from "./layout";
import { baseRouterList } from "@/routes";
import { ADMIN } from "@/common/utils/contans";
const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([""]);
  const { user } = useSelector(state => state) as { user: IUserInitialState };
  const navigator = useNavigate();
  const dispatch = useDispatch();

  useLocationListen(location => {
    const { pathname } = location;
    let temp = pathname.split("/").filter(item => item);
    setSelectedKeys([temp.join("/")]);
  });

  useEffect(() => {
    if (!user.token) return navigator("/login");
    const data: {
      menu1: MenuItem[];
      menu2: MenuItem[];
    } = {
      menu1: [
        {
          label: "User",
          key: "user",
          icon: <DesktopOutlined />,
          path: "pages/user",
        },
      ],
      menu2: [
        {
          label: "User",
          key: "user",
          icon: <DesktopOutlined />,
          path: "pages/user",
        },
        {
          label: "System Management",
          key: "systemManagement",
          icon: <UserOutlined />,
          children: [
            {
              label: "User Management",
              key: "systemManagement/userManagement",
              path: "pages/systemManagement/userManagement",
            },
            {
              label: "Role Management",
              key: "systemManagement/roleManagement",
              path: "pages/systemManagement/roleManagement",
            },
          ],
        },
      ],
    };
    // console.log(user.token, "user.token");
    if ((user.token as unknown as { username: string })?.username === ADMIN) {
      dispatch(setMenu([...baseRouterList, ...data.menu2]));
    } else {
      dispatch(setMenu([...baseRouterList, ...data.menu1]));
    }
  }, []);

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
