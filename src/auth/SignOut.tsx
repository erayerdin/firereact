// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";
import { ReactNode } from "react";
import { UseSignOutDispatcher, useSignOut } from ".";

type SignOutProps = {
  auth: Auth;
  onlyRealAnon?: boolean;
  onReady?: (dispatch: UseSignOutDispatcher) => ReactNode;
  onLoading?: () => ReactNode;
  onAnonymous?: () => ReactNode;
};

export const SignOut = ({
  auth,
  onlyRealAnon = false,
  onReady,
  onLoading,
  onAnonymous,
}: SignOutProps) => {
  const { state, dispatch } = useSignOut(auth, { onlyRealAnon });

  switch (state) {
    case "ready":
      return onReady ? (
        onReady(dispatch)
      ) : (
        <button onClick={dispatch}>Sign Out</button>
      );
    case "loading":
      return onLoading ? onLoading() : <></>;
    case "anonymous":
      return onAnonymous ? onAnonymous() : <></>;
  }
};
