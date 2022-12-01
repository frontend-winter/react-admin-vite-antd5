import "./App.scss";
import { defaultRoutes, filepathToElement } from "./routes";
import { useRoutes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserInitialState } from "@/store/reducers/user";
import { ADMIN } from "@/common/utils/contans";
import { setMenu } from "@/store/actions";
import { cloneDeep } from "lodash";
import { AuthContext, signIn, signOut } from "@/common/context";
import { MenuData } from "@/common/mock";
import { useLocationListen } from "@/common/hooks";
import { Settings } from "@/config/defaultSetting";

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
  // console.log(cloneDefaultRoutes, "cloneDefaultRoutes");
  useLocationListen(r => {
    document.title = `${Settings.title}: ${r.pathname.replace("/", "")}`;
  });
  const element = useRoutes(cloneDefaultRoutes);
  useEffect(() => {
    // console.log(token, "token");
    if ((token as unknown as { username: string })?.username === ADMIN) {
      dispatch(setMenu([...MenuData.admin]));
    } else {
      dispatch(setMenu([...MenuData.user]));
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {element}
    </AuthContext.Provider>
  );
}

export default App;
