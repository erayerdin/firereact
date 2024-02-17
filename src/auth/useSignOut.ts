// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from ".";

type UseSignOutParams = {
  onError?: (error: Error) => void;
  onlyRealAnon?: boolean;
};

type UseSignOutState = "ready" | "loading" | "anonymous";
export type UseSignOutDispatcher = () => Promise<void>;

type UseSignOut = {
  state: UseSignOutState;
  dispatch: UseSignOutDispatcher;
};

export const useSignOut = (
  auth: Auth,
  { onError, onlyRealAnon }: UseSignOutParams = {
    onError: () => {},
    onlyRealAnon: false,
  },
): UseSignOut => {
  const [state, setState] = useState<UseSignOutState>("ready");
  const user = useUser(auth, { onError });

  useEffect(() => {
    // if (!user || user.isAnonymous) {
    //   setState("anonymous");
    // }
    if (onlyRealAnon) {
      if (!user) {
        setState("anonymous");
      }
    } else {
      if (!user || user.isAnonymous) {
        setState("anonymous");
      }
    }
  }, [user, onlyRealAnon]);

  const dispatch: UseSignOutDispatcher = async () => {
    setState("loading");
    await auth.signOut();
    setState("anonymous");
  };

  return { state, dispatch: state === "ready" ? dispatch : async () => {} };
};
