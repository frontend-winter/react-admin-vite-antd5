import { actionTypes } from "@/store/actions";
import { getStorage, setStorage } from "@/common/utils/storage";
import { TOKEN } from "@/common/utils/contans";

export interface IUserInitialState {
  role: string[];
  token: string;
  menu: string[];
  [key: string]: any;
}

export interface Type {
  type: string;
}
// 默认状态
const initialState: IUserInitialState = {
  role: [],
  token: getStorage(TOKEN) ?? "",
  menu: [],
};
/**
 * user
 * @param {*} state
 * @param {*} action
 */
export default function (
  state = initialState,
  { type, token, menu }: IUserInitialState & Type
) {
  switch (type) {
    case actionTypes.userToken: {
      setStorage(TOKEN, token, 3000);
      return {
        ...state,
        token,
      };
    }
    case actionTypes.menu: {
      return {
        ...state,
        ...menu,
      };
    }
    default: {
      return state;
    }
  }
}
