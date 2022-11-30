import Layout from "@/components/Layout";
import ErrorPage from "@/pages/error-page";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import { Navigate } from "react-router-dom";
import { MenuItem } from "@/components/Layout/layout";
import OutletLayoutRouter from "@/components/OutletLayoutRouter";
import { lazy, Suspense } from "react";
import { Alert, Button, Result, Spin } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { getStorage } from "@/common/utils/storage";
import { TOKEN } from "@/common/utils/contans";

const Permissions = ({ children }: any) => {
  const token = getStorage(TOKEN);
  return token ? children : <Navigate to="/login" />;
};

export const baseRouterList = [
  {
    label: "Dashboard",
    key: "dashboard",
    path: "dashboard",
    icon: <DashboardOutlined />,
    filepath: "pages/dashboard/index.tsx",
  },
];

export const defaultRoutes: any = [
  {
    path: "/",
    element: <Permissions>{<Layout />}</Permissions>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "/*",
        element: (
          <ErrorPage>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary">Back Home</Button>}
            />
          </ErrorPage>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

// /**/ 表示二级目录 一般二级目录就够了  不够在加即可
export const modules = import.meta.glob("../pages/**/*.tsx");

function pathToLazyComponent(Ele: string) {
  const path = modules[`../${Ele}`] as any;
  if (!path)
    return (
      <ErrorPage>
        <Alert
          message={
            Ele +
            ":Cannot find the path, please configure the correct folder path"
          }
          type="error"
        />
      </ErrorPage>
    );
  let Components = lazy(path);
  return (
    <Suspense fallback={<Spin size="large" />}>
      <Components />
    </Suspense>
  );
}
export const filepathToElement = (list: MenuItem[]) =>
  list.map(item => {
    if (item.children) {
      return {
        path: item.path,
        key: item.key,
        children: item.children?.map(c => ({
          key: c.key,
          path: c.path,
          element: pathToLazyComponent(c.filepath),
        })),
        element: <OutletLayoutRouter />,
      };
    } else {
      return {
        key: item.key,
        path: item.path,
        element: pathToLazyComponent(item.filepath),
      };
    }
  });
