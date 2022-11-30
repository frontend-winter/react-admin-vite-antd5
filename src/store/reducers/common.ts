// 默认状态
const initialState = {
  data: [],
};
/**
 * 控制查询结果的reducer
 * @param {*} state
 * @param {*} action
 */
export default function (
  state = initialState,
  { type }: { type: string; payload: any }
) {
  switch (type) {
    default: {
      return state;
    }
  }
}
