import React, { Dispatch } from "react";

import { sleep } from "@/common/utils/common";
import { TOKEN } from "@/common/utils/contans";
import { getStorage, removeStorage, setStorage } from "@/common/utils/storage";
import { setUserToken } from "@/store/reducers/user";

interface AuthContextType {
  // no-async-promise-executor
  signIn: (dispatch: Dispatch<any>, values: string) => Promise<unknown>;
  // no-async-promise-executor
  signOut: (dispatch: Dispatch<any>) => Promise<unknown>;
}

export const signIn = async (dispatch: any, values: string) => {
  await sleep(1000);
  setStorage(TOKEN, values, 1000 * 60 * 24);
  dispatch(setUserToken(getStorage(TOKEN)));
};

export const signOut = (dispatch: any) => {
  return new Promise((resolve) => {
    try {
      removeStorage(TOKEN);
      dispatch(setUserToken(""));
    } finally {
      resolve("");
    }
  });
};

export const AuthContext = React.createContext<AuthContextType>({
  signIn,
  signOut,
});
