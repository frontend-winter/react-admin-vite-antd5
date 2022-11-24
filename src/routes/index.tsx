import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "@/components/Layout";
import ErrorPage from "@/pages/error-page";
import Dashboard from "@/pages/dashboard";
import User from "@/pages/user";
import Login from "@/pages/login";

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
    ],
  },
  {
    path: "login",
    element: <Login />,
  }
]);
