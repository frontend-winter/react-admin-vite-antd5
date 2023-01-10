import { TOKEN } from "@/common/utils/contans";
import { getStorage } from "@/common/utils/storage";
import { MenuItem } from "@/components/Layout/layout";
import { createSlice } from "@reduxjs/toolkit";
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

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { setUserToken, setMenu } = userSlice.actions;

export default userSlice.reducer;
