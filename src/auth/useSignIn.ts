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
        try {
          const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          setState("authenticated");
          return credential;
        } catch (e) {
          setState("ready");
          throw e;
        }
      }
      case "link": {
        const { email, actionCodeSetting } = params;
        try {
          await sendSignInLinkToEmail(auth, email, actionCodeSetting);
          setState("awaiting");
          return undefined;
        } catch (e) {
          setState("ready");
          throw e;
        }
      }
      case "google": {
        const { provider } = params;
        try {
          const credential = await signInWithPopup(auth, provider);
          setState("authenticated");
          return credential;
        } catch (e) {
          setState("ready");
          throw e;
        }
      }
      case "facebook": {
        const { provider } = params;
        try {
          const credential = await signInWithPopup(auth, provider);
          setState("authenticated");
          return credential;
        } catch (e) {
          setState("ready");
          throw e;
        }
      }
      case "apple": {
        const { provider } = params;
        try {
          const credential = await signInWithPopup(auth, provider);
          setState("authenticated");
          return credential;
        } catch (e) {
          const credential = await signInWithPopup(auth, provider);
          setState("authenticated");
          return credential;
        }
      }
      case "twitter": {
        const { provider } = params;
        try {
          const credential = await signInWithPopup(auth, provider);
          setState("authenticated");
          return credential;
        } catch (e) {
          setState("ready");
          throw e;
        }
      }
      case "github": {
        const { provider } = params;
        try {
          const credential = await signInWithPopup(auth, provider);
          setState("authenticated");
          return credential;
        } catch (e) {
          setState("ready");
          throw e;
        }
      }
      case "microsoft": {
        const { provider } = params;
        try {
          const credential = await signInWithPopup(auth, provider);
          setState("authenticated");
          return credential;
        } catch (e) {
          setState("ready");
          throw e;
        }
      }
      case "yahoo": {
        const { provider } = params;
        try {
          const credential = await signInWithPopup(auth, provider);
          setState("authenticated");
          return credential;
        } catch (e) {
          setState("ready");
          throw e;
        }
      }
    }
  };

  return { state, dispatch };
};
