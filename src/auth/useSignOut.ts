// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";
import { useState } from "react";

type UseSignOutParams = {
  auth: Auth;
};

type UseSignOutState = "ready" | "loading" | "done";
export type UseSignOutDispatcher = () => Promise<void>;

type UseSignOUt = {
  state: UseSignOutState;
  dispatch: UseSignOutDispatcher;
};

export const useSignOut = ({ auth }: UseSignOutParams): UseSignOUt => {
  const [state, setState] = useState<UseSignOutState>("ready");

  const dispatch: UseSignOutDispatcher = async () => {
    setState("loading");
    await auth.signOut();
    setState("done");
  };

  return { state, dispatch };
};
