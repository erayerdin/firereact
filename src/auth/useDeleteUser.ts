// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";
import { useUser } from ".";

type UseDeleteUserParams = {
  auth: Auth;
  includeFirebaseAnon?: boolean;
};

type UseDeleteUserState = "ready" | "anonymous";
type UseDeleteUser = {
  state: UseDeleteUserState;
};

export const useDeleteUser = ({
  auth,
  includeFirebaseAnon = false,
}: UseDeleteUserParams): UseDeleteUser => {
  const user = useUser({ auth });

  return {
    state: user
      ? user.isAnonymous
        ? includeFirebaseAnon
          ? "ready"
          : "anonymous"
        : "ready"
      : "anonymous",
  };
};
