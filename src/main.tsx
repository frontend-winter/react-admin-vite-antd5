import "./main.css";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./app";
import { Settings } from "./config/defaultSetting";
import store from "./store";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

// 生产环境配置二级路径
root.render(
  <Provider store={store}>
    <BrowserRouter
      basename={
        import.meta.env.MODE === "development" ? "/" : `/${Settings.title}/`
      }
    >
      <App />
    </BrowserRouter>
  </Provider>
);
