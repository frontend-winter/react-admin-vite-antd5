import "./main.css";

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
      <App />
    </BrowserRouter>
  </Provider>
);
