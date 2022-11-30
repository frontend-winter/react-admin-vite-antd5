import { createRoot } from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import store from "./store";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
