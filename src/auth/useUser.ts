// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  Auth,
  CompleteFn,
  ErrorFn,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";

type UseAuthStateParams = {
  auth: Auth;
  onError?: ErrorFn;
  onChange?: CompleteFn;
};

type UseAuthState = {
  user: User | null;
};

export const useUser = ({
  auth,
  onError,
  onChange,
}: UseAuthStateParams): UseAuthState => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => setUser(user),
      onError,
      onChange,
    );
    return unsub;
  }, [auth, onError, onChange]);

  return { user };
};
