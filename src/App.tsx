import "./App.scss";
import { defaultRoutes, filepathToElement } from "./routes";
import { useRoutes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserInitialState } from "@/store/reducers/user";
import AuthProvider from "./AuthProvider";
import { MenuItem } from "@/components/Layout/layout";
import {
  DesktopOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ADMIN } from "@/common/utils/contans";
import { setMenu } from "@/store/actions";
import { cloneDeep } from "lodash";

function App() {
  const dispatch = useDispatch();
  const {
    user: { token, menu },
  } = useSelector(state => state) as { user: IUserInitialState };
  const cloneDefaultRoutes = cloneDeep(defaultRoutes);
  cloneDefaultRoutes[0].children = [
    ...filepathToElement(menu),
    ...cloneDefaultRoutes[0].children,
  ];
  console.log(cloneDefaultRoutes, "cloneDefaultRoutes");
  const element = useRoutes(cloneDefaultRoutes);
  useEffect(() => {
    const data: {
      user: MenuItem[];
      admin: MenuItem[];
    } = {
      user: [
        {
          label: "User",
          key: "user",
          path: "/user",
          icon: <DesktopOutlined />,
          filepath: "pages/user/index.tsx",
        },
      ],
      admin: [
        {
          label: "User",
          key: "user",
          path: "user",
          icon: <DesktopOutlined />,
          filepath: "pages/user/index.tsx",
        },
        {
          label: "List Page",
          key: "list-page",
          path: "list-page",
          icon: <TableOutlined />,
          filepath: "pages/list-page/index.tsx",
        },
        {
          label: "System Management",
          key: "systemManagement",
          path: "systemManagement",
          icon: <UserOutlined />,
          filepath: "components/OutletLayoutRouter/index.tsx",
          children: [
            {
              label: "User Management",
              key: "userManagement",
              path: "userManagement",
              filepath: "pages/systemManagement/userManagement/index.tsx",
            },
            {
              label: "Role Management",
              key: "roleManagement",
              path: "roleManagement",
              filepath: "pages/systemManagement/roleManagement/index.tsx",
            },
          ],
        },
      ],
    };
    if ((token as unknown as { username: string })?.username === ADMIN) {
      dispatch(setMenu([...data.admin]));
    } else {
      dispatch(setMenu([...data.user]));
    }
  }, [token]);

  return <AuthProvider>{element}</AuthProvider>;
}

export default App;
