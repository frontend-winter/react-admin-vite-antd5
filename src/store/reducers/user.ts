import { TOKEN } from "@/common/utils/contans";
import { getStorage } from "@/common/utils/storage";
import { MenuItem } from "@/components/Layout/layout";
import { actionTypes } from "@/store/actions";

export interface IUserInitialState {
  role: string[];
  token: string;
  menu: MenuItem[];
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
export const user = (
  state = initialState,
  { type, token, menu }: IUserInitialState & Type
) => {
  switch (type) {
    case actionTypes.userToken: {
      return {
        ...state,
        token,
      };
    }
    case actionTypes.menu: {
      return {
        ...state,
        menu: menu,
      };
    }
    default: {
      return state;
    }
  }
};
