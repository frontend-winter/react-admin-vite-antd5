import { actionTypes } from "@/store/actions";
import { getStorage, setStorage } from "@/common/utils/storage";
import { TOKEN } from "@/common/utils/contans";

// 默认状态
const initialState = {
  role: [],
  token: getStorage(TOKEN) ?? "",
};
/**
 * user
 * @param {*} state
 * @param {*} action
 */
export default function (
  state = initialState,
  { type, token }: { type: string; token: string }
) {
  switch (type) {
    case actionTypes.userToken:
      setStorage(TOKEN, token, 3000);
      return {
        ...state,
        token,
      };
    default:
      return state;
  }
}
