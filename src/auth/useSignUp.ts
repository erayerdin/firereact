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

type UseSignUpState = "ready" | "loading" | "authenticated";
type UseSignUpDispatcher = (
  email: string,
  password: string,
) => Promise<UserCredential | undefined>;
type UseSignUp = {
  state: UseSignUpState;
  dispatch: UseSignUpDispatcher;
};

export const useSignUp = (auth: Auth): UseSignUp => {
  const user = useUser(auth);
  const [state, setState] = useState<UseSignUpState>("ready");

  useEffect(() => {
    setState(user ? (user.isAnonymous ? "ready" : "authenticated") : "ready");
  }, [user]);

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
    dispatch: state === "ready" ? dispatch : async () => undefined,
  };
};
