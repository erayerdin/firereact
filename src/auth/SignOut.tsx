// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";
import { ReactNode } from "react";
import { UseSignOutDispatcher, useSignOut } from ".";

type SignOutProps = {
  auth: Auth;
  onReady?: (dispatch: UseSignOutDispatcher) => ReactNode;
  onLoading?: () => ReactNode;
  onDone?: () => ReactNode;
};

export const SignOut = ({ auth, onReady, onLoading, onDone }: SignOutProps) => {
  const { state, dispatch } = useSignOut({ auth });

  switch (state) {
    case "ready":
      return onReady ? (
        onReady(dispatch)
      ) : (
        <button onClick={dispatch}>Sign Out</button>
      );
    case "loading":
      return onLoading ? onLoading() : <></>;
    case "done":
      return onDone ? onDone() : <></>;
  }
};
