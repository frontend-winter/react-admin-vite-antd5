// 用于创建仓库，并导出
import { applyMiddleware, legacy_createStore as createStore } from "redux";
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducer from "./reducers";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
