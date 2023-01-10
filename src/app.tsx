import "./App.scss";

import { cloneDeep } from "lodash";
import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";

import { AuthContext, signIn, signOut } from "@/common/context";
import {
  useAppDispatch,
  useAppSelector,
  useLocationListen,
} from "@/common/hooks";
import { MenuData } from "@/common/mock";
import { ADMIN } from "@/common/utils/contans";
import { Settings } from "@/config/defaultSetting";
import { setMenu } from "@/store/reducers/user";

import { defaultRoutes, filepathToElement } from "./routes";

function App() {
  const dispatch = useAppDispatch();
  const {
    user: { token, menu },
  } = useAppSelector(state => state);
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
