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
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { ActionCodeSettings } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from ".";

type UseSignInState = "ready" | "loading" | "authenticated" | "awaiting";
type UseSignInDispatcher = (
  params:
    | {
        type: "classic";
        email: string;
        password: string;
      }
    | {
        type: "link";
        email: string;
        actionCodeSetting: ActionCodeSettings;
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
) => Promise<UserCredential | undefined>;
type UseSignIn = {
  state: UseSignInState;
  dispatch: UseSignInDispatcher;
};

export const useSignIn = (auth: Auth): UseSignIn => {
  const user = useUser(auth);
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
        setState("authenticated");
        return credential;
      }
      case "link": {
        const { email, actionCodeSetting } = params;
        await sendSignInLinkToEmail(auth, email, actionCodeSetting);
        setState("awaiting");
        return undefined;
      }
      case "google": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        setState("authenticated");
        setState("authenticated");
        return credential;
      }
      case "facebook": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        setState("authenticated");
        setState("authenticated");
        return credential;
      }
      case "apple": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        setState("authenticated");
        return credential;
      }
      case "twitter": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        setState("authenticated");
        return credential;
      }
      case "github": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        setState("authenticated");
        return credential;
      }
      case "microsoft": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        setState("authenticated");
        return credential;
      }
      case "yahoo": {
        const { provider } = params;
        const credential = await signInWithPopup(auth, provider);
        setState("authenticated");
        return credential;
      }
    }
  };

  return { state, dispatch };
};
