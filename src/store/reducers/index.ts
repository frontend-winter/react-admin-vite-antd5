import { combineReducers } from "redux";

import common from "./common";
import { user } from "./user";

export default combineReducers({
  common,
  user,
});
