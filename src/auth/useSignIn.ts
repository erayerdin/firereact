// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type UseSignInState = "authenticated";
type UseSignIn = {
  state: UseSignInState;
};

export const useSignIn = (): UseSignIn => {
  return { state: "authenticated" };
};
