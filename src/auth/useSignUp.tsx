// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type SignUpParams = {
  state: "ready";
};

export const useSignUp = (): SignUpParams => {
  return { state: "ready" };
};
