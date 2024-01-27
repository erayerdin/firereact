// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from ".";

type UseSignUpState = "ready" | "authenticated";
type UseSignUp = {
  state: UseSignUpState;
};

type UseSignUpParams = {
  auth: Auth;
  onlyRealAnon?: boolean;
};

export const useSignUp = ({
  auth,
  onlyRealAnon = true,
}: UseSignUpParams): UseSignUp => {
  const [state, setState] = useState<UseSignUpState>("ready");
  const user = useUser({ auth });

  useEffect(() => {
    if (onlyRealAnon) {
      if (user) {
        setState("authenticated");
      }
    } else {
      if (user) {
        if (!user.isAnonymous) {
          setState("authenticated");
        }
      }
    }
  }, [user, onlyRealAnon]);

  return { state };
};
