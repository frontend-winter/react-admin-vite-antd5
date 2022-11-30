import { MenuItem } from "@/components/Layout/layout";

export const actionTypes = {
  //用户
  userToken: "userToken",
  //菜单
  menu: "menu",
};

export function setUserToken(token: string) {
  return {
    type: actionTypes.userToken,
    token,
  };
}

export function setMenu(menu: MenuItem[]) {
  return {
    type: actionTypes.menu,
    menu,
  };
}
