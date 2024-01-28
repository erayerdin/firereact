// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth, deleteUser, signOut } from "firebase/auth";
import { useUser } from ".";

type UseDeleteUserParams = {
  auth: Auth;
  includeFirebaseAnon?: boolean;
};

type UseDeleteUserState = "ready" | "anonymous";
type UseDeleteUserDispatcher = () => Promise<void>;
type UseDeleteUser = {
  state: UseDeleteUserState;
  dispatch: UseDeleteUserDispatcher;
};

export const useDeleteUser = ({
  auth,
  includeFirebaseAnon = false,
}: UseDeleteUserParams): UseDeleteUser => {
  const user = useUser({ auth });
  const state: UseDeleteUserState = user
    ? user.isAnonymous
      ? includeFirebaseAnon
        ? "ready"
        : "anonymous"
      : "ready"
    : "anonymous";

  const dispatch: UseDeleteUserDispatcher = async () => {
    if (user) {
      await deleteUser(user);
      await signOut(auth);
    }
  };

  return {
    state,
    dispatch: state === "ready" ? dispatch : async () => {},
  };
};
