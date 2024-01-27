// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from ".";

type UseSignOutParams = {
  auth: Auth;
  onError?: (error: Error) => void;
};

type UseSignOutState = "ready" | "loading" | "done";
export type UseSignOutDispatcher = () => Promise<void>;

type UseSignOUt = {
  state: UseSignOutState;
  dispatch: UseSignOutDispatcher;
};

export const useSignOut = ({ auth, onError }: UseSignOutParams): UseSignOUt => {
  const [state, setState] = useState<UseSignOutState>("ready");
  const user = useUser({ auth, onError });

  useEffect(() => {
    if (!user) {
      setState("done");
    }
  }, [user]);

  const dispatch: UseSignOutDispatcher = async () => {
    setState("loading");
    await auth.signOut();
    setState("done");
  };

  return { state, dispatch: state === "ready" ? dispatch : async () => {} };
};
