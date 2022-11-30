import "./App.scss";
import { defaultRoutes, filepathToElement } from "./routes";
import { useRoutes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserInitialState } from "@/store/reducers/user";
import { MenuItem } from "@/components/Layout/layout";
import {
  DesktopOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ADMIN, TOKEN } from "@/common/utils/contans";
import { setMenu, setUserToken } from "@/store/actions";
import { cloneDeep } from "lodash";
import { sleep } from "@/common/utils/common";
import { getStorage, removeStorage, setStorage } from "@/common/utils/storage";

interface AuthContextType {
  signIn: (user: string) => Promise<any>;
  signOut: () => Promise<any>;
}

export let AuthContext = React.createContext<AuthContextType>({
  signIn(user: string): Promise<any> {
    return Promise.resolve(user);
  },
  signOut(): Promise<any> {
    return Promise.resolve();
  },
});

function App() {
  const dispatch = useDispatch();

  let signIn = (values: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        await sleep(1000);
        setStorage(TOKEN, values, 3000);
        dispatch(setUserToken(getStorage(TOKEN)));
        resolve({});
      } catch {
        reject();
      }
    });
  };

  let signOut = () => {
    return new Promise(async resolve => {
      try {
        removeStorage(TOKEN);
        dispatch(setUserToken(""));
      } finally {
        resolve({});
      }
    });
  };

  const {
    user: { token, menu },
  } = useSelector(state => state) as { user: IUserInitialState };
  const cloneDefaultRoutes = cloneDeep(defaultRoutes);
  cloneDefaultRoutes[0].children = [
    ...filepathToElement(menu),
    ...cloneDefaultRoutes[0].children,
  ];
  // console.log(cloneDefaultRoutes, "cloneDefaultRoutes");
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
    // console.log(token, "token");
    if ((token as unknown as { username: string })?.username === ADMIN) {
      dispatch(setMenu([...data.admin]));
    } else {
      dispatch(setMenu([...data.user]));
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {element}
    </AuthContext.Provider>
  );
}

export default App;
