// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth, User } from "firebase/auth";
import { ReactNode } from "react";
import { useUser } from ".";

type AuthenticationZoneProps = {
  auth: Auth;
  onAuthenticated?: (user: User) => ReactNode;
  onAnonymous?: () => ReactNode;
};

export const AuthenticationZone = ({
  auth,
  onAuthenticated = () => <></>,
  onAnonymous = () => <></>,
}: AuthenticationZoneProps) => {
  const user = useUser({ auth });

  return user ? onAuthenticated(user) : onAnonymous();
};
