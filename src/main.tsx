import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./main.css";
const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
