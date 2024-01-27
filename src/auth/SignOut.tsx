// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";
import { ReactNode } from "react";
import { useSignOut } from ".";

type SignOutProps = {
  auth: Auth;
  onReady: () => ReactNode;
  onDone?: () => ReactNode;
};

export const SignOut = ({ auth, onReady, onDone }: SignOutProps) => {
  const { state, dispatch } = useSignOut({ auth });

  switch (state) {
    case "ready":
      return <div onClick={dispatch}>{onReady()}</div>;
    case "loading":
    case "done":
      return onDone ? onDone() : <></>;
  }
};
