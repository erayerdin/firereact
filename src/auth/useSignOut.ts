// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";

type UseSignOutParams = {
  auth: Auth;
};

type UseSignOUt = {
  state: "ready";
};

export const useSignOut = ({ auth }: UseSignOutParams): UseSignOUt => {
  return { state: "ready" };
};
