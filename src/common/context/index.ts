import React, { Dispatch } from "react";

import { sleep } from "@/common/utils/common";
import { TOKEN } from "@/common/utils/contans";
import { getStorage, removeStorage, setStorage } from "@/common/utils/storage";
import { setUserToken } from "@/store/reducers/user";

interface AuthContextType {
  signIn: (dispatch: Dispatch<any>, user: string) => Promise<any>;
  signOut: (dispatch: Dispatch<any>) => Promise<any>;
}

export const AuthContext = React.createContext<AuthContextType>({
  signIn(dispatch, user): Promise<any> {
    return Promise.resolve(user);
  },
  signOut(): Promise<any> {
    return Promise.resolve();
  },
});

export const signIn = (dispatch: Dispatch<any>, values: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      await sleep(1000);
      setStorage(TOKEN, values, 1000 * 60);
      dispatch(setUserToken(getStorage(TOKEN)));
      resolve({});
    } catch {
      reject();
    }
  });
};

export const signOut = (dispatch: Dispatch<any>) => {
  return new Promise(async resolve => {
    try {
      removeStorage(TOKEN);
      dispatch(setUserToken(""));
    } finally {
      resolve({});
    }
  });
};
