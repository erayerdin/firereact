// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";
import { useUser } from ".";

type UseSignUpParams = {
  auth: Auth;
};

type UseSignUpState = "ready" | "authenticated";
type UseSignUp = {
  state: UseSignUpState;
};

export const useSignUp = ({ auth }: UseSignUpParams): UseSignUp => {
  const user = useUser({ auth });
  return { state: user ? "authenticated" : "ready" };
};
