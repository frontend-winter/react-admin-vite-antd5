import "./main.css";

import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./app";
import store from "./store";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);
root.render(
  <Provider store={store}>
    <BrowserRouter
      // 生产环境配置二级路径
      basename={"/" + import.meta.env.BASE_URL.replaceAll("/", "")}
    >
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 4,
            fontSize: 14,
            colorPrimary: "pink",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
