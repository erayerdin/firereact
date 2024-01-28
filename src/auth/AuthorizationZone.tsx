// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth, User } from "firebase/auth";
import { ReactNode } from "react";
import { useUser } from ".";

type AuthorizationZoneProps = {
  auth: Auth;
  excludeFirebaseAnon?: boolean;
  onAuthenticated?: (user: User) => ReactNode;
  onAnonymous?: () => ReactNode;
};

export const AuthorizationZone = ({
  auth,
  excludeFirebaseAnon = false,
  onAuthenticated = () => <></>,
  onAnonymous = () => <></>,
}: AuthorizationZoneProps) => {
  const user = useUser({ auth });

  return user
    ? user.isAnonymous
      ? excludeFirebaseAnon
        ? onAuthenticated(user)
        : onAnonymous()
      : onAuthenticated(user)
    : onAnonymous();
};
