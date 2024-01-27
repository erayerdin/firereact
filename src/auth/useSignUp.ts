// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { useUser } from ".";

type UseSignUpParams = {
  auth: Auth;
};

type UseSignUpState = "ready" | "authenticated";
type UseSignUpDispatcher = (email: string, password: string) => Promise<void>;
type UseSignUp = {
  state: UseSignUpState;
  dispatch: UseSignUpDispatcher;
};

export const useSignUp = ({ auth }: UseSignUpParams): UseSignUp => {
  const user = useUser({ auth });
  const state: UseSignUpState = user
    ? user.isAnonymous
      ? "ready"
      : "authenticated"
    : "ready";

  const dispatch: UseSignUpDispatcher = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return {
    state,
    dispatch: state === "ready" ? dispatch : async () => {},
  };
};
