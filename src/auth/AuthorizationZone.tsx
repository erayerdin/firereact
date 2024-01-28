// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { useUser } from ".";

type AuthorizationZoneValidator = (
  user: User | null,
) => Promise<boolean> | boolean;

type AuthorizationZoneProps = {
  auth: Auth;
  validator?: AuthorizationZoneValidator;
  onSuccess: (user: User | null) => ReactNode;
  onFailure?: (user: User | null) => ReactNode;
};

export const AuthorizationZone = ({
  auth,
  validator = Validators.isAuthenticated(),
  onSuccess,
  onFailure = () => <></>,
}: AuthorizationZoneProps) => {
  const user = useUser({ auth });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const taskOrVal = validator(user);

    if (taskOrVal instanceof Promise) {
      taskOrVal.then(setSuccess);
    } else {
      setSuccess(taskOrVal);
    }
  }, [user, validator]);

  return success ? onSuccess(user) : onFailure(user);
};

export const Validators = {
  isAuthenticated:
    (includeFirebaseAnon = false) =>
    (user: User | null) => {
      return user ? (includeFirebaseAnon ? true : !user.isAnonymous) : false;
    },
  isAnonymous: () => (user: User | null) => (user ? user.isAnonymous : true),
};
