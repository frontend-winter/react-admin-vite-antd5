import { createRoot } from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import store from "./store";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { Settings } from "./config/defaultSetting";
const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

console.log(import.meta.env);
root.render(
  <Provider store={store}>
    <BrowserRouter
      basename={
        // 生产环境配置二级路径
        import.meta.env.MODE === "development" ? "/" : `/${Settings.title}/`
      }
    >
      <App />
    </BrowserRouter>
  </Provider>
);
