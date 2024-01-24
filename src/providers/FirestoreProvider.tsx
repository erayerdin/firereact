// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Firestore } from "firebase/firestore";
import { createContext } from "react";
import { NodeComponent } from "../types";

export const FirestoreContext = createContext<Firestore | undefined>(undefined);

type FirestoreProviderProps = {
  firestore: Firestore;
} & NodeComponent;

export const FirestoreProvider = ({
  firestore,
  children,
}: FirestoreProviderProps) => {
  return (
    <FirestoreContext.Provider value={firestore}>
      {children}
    </FirestoreContext.Provider>
  );
};
