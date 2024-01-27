// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type UseSignUpState = "authenticated";
type UseSignUp = {
  state: UseSignUpState;
};

export const useSignUp = (): UseSignUp => {
  return { state: "authenticated" };
};
