import { actionTypes } from "@/store/actions";

// 默认状态
const initialState = {
  data: [],
  total: 0
}
/**
 * 控制查询结果的reducer
 * @param {*} state
 * @param {*} action
 */
export default function (state = initialState, {type, payload} : { type: string, payload: any }) {
  switch (type) {
    case actionTypes.setStudentsAndTotal:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}