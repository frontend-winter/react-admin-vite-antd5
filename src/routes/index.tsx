import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "@/components/Layout";
import ErrorPage from "@/pages/error-page";
import Dashboard from "@/pages/dashboard";
import User from "@/pages/user";
import Login from "@/pages/login";
import RoleManagement from "@/pages/systemManagement/roleManagement";
import UserManagement from "@/pages/systemManagement/userManagement";
import LayoutRouter from "@/components/OutletLayoutRouter";
import React from "react";
import { DashboardOutlined } from "@ant-design/icons";

export const baseRouter = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
];

export const baseRouterList = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <DashboardOutlined />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: () => redirect("/dashboard"),
      },
      ...baseRouter,
      {
        path: "user",
        element: <User />,
      },
      {
        path: "systemManagement",
        element: <LayoutRouter />,
        children: [
          {
            index: true,
            path: "roleManagement",
            element: <RoleManagement />,
          },
          {
            path: "userManagement",
            element: <UserManagement />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
