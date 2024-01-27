// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from ".";

type UseSignUpDispatcher = (
  email: string,
  password: string,
) => Promise<UserCredential | undefined>;
type UseSignUpState = "ready" | "loading" | "authenticated";
type UseSignUp = {
  state: UseSignUpState;
  dispatch: UseSignUpDispatcher;
};

type UseSignUpParams = {
  auth: Auth;
  onlyRealAnon?: boolean;
};

export const useSignUp = ({
  auth,
  onlyRealAnon = true,
}: UseSignUpParams): UseSignUp => {
  const [state, setState] = useState<UseSignUpState>("ready");
  const user = useUser({ auth });

  useEffect(() => {
    if (onlyRealAnon) {
      if (user) {
        setState("authenticated");
      }
    } else {
      if (user) {
        if (!user.isAnonymous) {
          setState("authenticated");
        }
      }
    }
  }, [user, onlyRealAnon]);

  const dispatch: UseSignUpDispatcher = async (email, password) => {
    setState("loading");
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    setState("authenticated");
    return credential;
  };

  return {
    state,
    dispatch: state === "authenticated" ? async () => undefined : dispatch,
  };
};
