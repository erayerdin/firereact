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
  onComplete?: CompleteFn;
};

type UseAuthState = {
  user: User | null;
};

export const useAuthState = ({
  auth,
  onError,
  onComplete,
}: UseAuthStateParams): UseAuthState => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => setUser(user),
      onError,
      onComplete,
    );
    return unsub;
  }, [auth, onError, onComplete]);

  return { user };
};
