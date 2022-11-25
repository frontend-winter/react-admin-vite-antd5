import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "@/components/Layout";
import ErrorPage from "@/pages/error-page";
import Dashboard from "@/pages/dashboard";
import User from "@/pages/user";
import Login from "@/pages/login";
import RoleManagement from "@/pages/systemManagement/roleManagement";
import UserManagement from "@/pages/systemManagement/userManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        loader: () => redirect("/dashboard"),
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "systemManagement",
        element: <RoleManagement />,
        // loader: () => redirect("roleManagement"),
        children: [
          {
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
