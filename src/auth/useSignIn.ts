// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  Auth,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  UserCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from ".";

type UseSignInParams = {
  auth: Auth;
};

type UseSignInState = "ready" | "loading" | "authenticated";
type UseSignInDispatcher = (
  params:
    | {
        type: "classic";
        email: string;
        password: string;
      }
    | {
        type: "google";
        provider: GoogleAuthProvider;
      }
    | {
        type: "facebook";
        provider: FacebookAuthProvider;
      }
    | {
        type: "apple" | "microsoft" | "yahoo";
        provider: OAuthProvider;
      }
    | {
        type: "twitter";
        provider: TwitterAuthProvider;
      }
    | {
        type: "github";
        provider: GithubAuthProvider;
      },
) => Promise<UserCredential>;
type UseSignIn = {
  state: UseSignInState;
  dispatch: UseSignInDispatcher;
};

export const useSignIn = ({ auth }: UseSignInParams): UseSignIn => {
  const user = useUser({ auth });
  const [state, setState] = useState<UseSignInState>("ready");

  useEffect(() => {
    setState(user ? (user.isAnonymous ? "ready" : "authenticated") : "ready");
    return () => setState("ready");
  }, [user]);

  const dispatch: UseSignInDispatcher = async (params) => {
    setState("loading");
    const { type } = params;

    switch (type) {
      case "classic": {
        const { email, password } = params;
        const credential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        return credential;
      }
      case "google": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        return credential;
      }
      case "facebook": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        return credential;
      }
      case "apple": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        return credential;
      }
      case "twitter": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        return credential;
      }
      case "github": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        return credential;
      }
      case "microsoft": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        return credential;
      }
      case "yahoo": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        return credential;
      }
    }
  };

  return { state, dispatch };
};
