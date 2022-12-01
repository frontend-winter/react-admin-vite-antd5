import React, { Dispatch } from "react";
import { sleep } from "@/common/utils/common";
import { getStorage, removeStorage, setStorage } from "@/common/utils/storage";
import { TOKEN } from "@/common/utils/contans";
import { setUserToken } from "@/store/actions";

interface AuthContextType {
  signIn: (dispatch: Dispatch<any>, user: string) => Promise<any>;
  signOut: (dispatch: Dispatch<any>) => Promise<any>;
}

export let AuthContext = React.createContext<AuthContextType>({
  signIn(dispatch, user): Promise<any> {
    return Promise.resolve(user);
  },
  signOut(): Promise<any> {
    return Promise.resolve();
  },
});

export let signIn = (dispatch: Dispatch<any>, values: string) => {
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

export let signOut = (dispatch: Dispatch<any>) => {
  return new Promise(async resolve => {
    try {
      removeStorage(TOKEN);
      dispatch(setUserToken(""));
    } finally {
      resolve({});
    }
  });
};
