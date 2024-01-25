// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth, User } from "firebase/auth";
import { useState } from "react";

type UseAuthStateParams = {
  auth: Auth;
};

type UseAuthState = {
  user: User | null;
};

export const useAuthState = ({ auth }: UseAuthStateParams): UseAuthState => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  return { user };
};
