// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Auth } from "firebase/auth";
import { createContext } from "react";
import { NodeComponent } from "../types";

export const FirebaseAuthContext = createContext<Auth | undefined>(undefined);

type FirebaseAuthProviderProps = {
  auth: Auth;
} & NodeComponent;

export const FirebaseAuthProvider = ({
  auth,
  children,
}: FirebaseAuthProviderProps) => {
  return (
    <FirebaseAuthContext.Provider value={auth}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
