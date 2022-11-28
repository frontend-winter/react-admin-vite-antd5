import React from "react";
import { useDispatch } from "react-redux";
import { sleep } from "@/common/utils/common";
import { getStorage, removeStorage, setStorage } from "@/common/utils/storage";
import { TOKEN } from "@/common/utils/contans";
import { setUserToken } from "@/store/actions";

interface AuthContextType {
  signIn: (user: string) => Promise<any>;
  signOut: () => Promise<any>;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  let signIn = (values: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        await sleep(1000);
        setStorage(TOKEN, values, 3000);
        dispatch(setUserToken(getStorage(TOKEN)));
        resolve({});
      } catch {
        reject();
      }
    });
  };

  let signOut = () => {
    return new Promise(async resolve => {
      try {
        dispatch(setUserToken(""));
        removeStorage(TOKEN);
      } finally {
        resolve({});
      }
    });
  };
  let value = { signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
