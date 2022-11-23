import "./App.css";

import React from "react";

import Index from "./components/Layout";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ErrorPage from "@/pages/error-page";
import User from "@/pages/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "user",
    element: <User />,
  },
]);


function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
