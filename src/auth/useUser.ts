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

type UseAuthStateOptions = {
  onError?: ErrorFn;
  onChange?: CompleteFn;
};

export const useUser = (
  auth: Auth,
  { onError, onChange }: UseAuthStateOptions = {
    onError: () => {},
    onChange: () => {},
  },
): User | null => {
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

  return user;
};
