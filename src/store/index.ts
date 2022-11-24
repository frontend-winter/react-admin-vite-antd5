// 用于创建仓库，并导出
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
