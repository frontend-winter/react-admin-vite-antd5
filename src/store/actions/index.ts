export const actionTypes = {
  //设置学生查询结果数组和总数
  setStudentsAndTotal: "setStudentsAndTotal",

  //用户
  userToken: "userToken",
};

export function setStudentsAndTotal(arr: [], total: number) {
  return {
    type: actionTypes.setStudentsAndTotal,
    payload: {
      data: arr,
      total,
    },
  };
}

export function setUserToken(token: string) {
  return {
    type: actionTypes.userToken,
    token,
  };
}
