// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import { Auth, deleteUser, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from ".";

type UseDeleteUserOptions = {
  includeFirebaseAnon?: boolean;
};

type UseDeleteUserState = "ready" | "loading" | "anonymous";
type UseDeleteUserDispatcher = () => Promise<void>;
type UseDeleteUser = {
  state: UseDeleteUserState;
  dispatch: UseDeleteUserDispatcher;
};

export const useDeleteUser = (
  auth: Auth,
  { includeFirebaseAnon }: UseDeleteUserOptions = {
    includeFirebaseAnon: false,
  },
): UseDeleteUser => {
  const user = useUser(auth);
  const [state, setState] = useState<UseDeleteUserState>("ready");

  useEffect(() => {
    setState(
      user
        ? user.isAnonymous
          ? includeFirebaseAnon
            ? "ready"
            : "anonymous"
          : "ready"
        : "anonymous",
    );
  }, [user, includeFirebaseAnon]);

  const dispatch: UseDeleteUserDispatcher = async () => {
    if (user) {
      setState("loading");
      try {
        await deleteUser(user);
        await signOut(auth);
        setState("anonymous");
      } catch (e) {
        if (e instanceof FirebaseError) {
          setState("ready");
          throw e;
        }
      }
    }
  };

  return {
    state,
    dispatch: state === "ready" ? dispatch : async () => {},
  };
};
