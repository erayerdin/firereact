// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from ".";

type UseSignInParams = {
  auth: Auth;
};

type UseSignInState = "ready" | "authenticated";
type UseSignIn = {
  state: UseSignInState;
};

export const useSignIn = ({ auth }: UseSignInParams): UseSignIn => {
  const user = useUser({ auth });
  const [state, setState] = useState<UseSignInState>("ready");

  useEffect(() => {
    setState(user ? (user.isAnonymous ? "ready" : "authenticated") : "ready");
    return () => setState("ready");
  }, [user]);

  return { state };
};
