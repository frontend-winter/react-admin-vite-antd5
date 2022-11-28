import "./App.scss";
import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { baseRouter, router } from "@/routes";
import { AuthProvider } from "@/AuthProvider";
import Layout from "@/components/Layout";
import ErrorPage from "@/pages/error-page";
import User from "@/pages/user";
import LayoutRouter from "@/components/OutletLayoutRouter";
import RoleManagement from "@/pages/systemManagement/roleManagement";
import UserManagement from "@/pages/systemManagement/userManagement";
import Login from "@/pages/login";

function App() {
  const [routerList, setRouterList] = useState(router);

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <AuthProvider>
      <RouterProvider router={routerList} />;
    </AuthProvider>
  );
}
export default App;
