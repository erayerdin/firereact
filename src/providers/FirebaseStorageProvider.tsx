// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseStorage } from "firebase/storage";
import { createContext } from "react";
import { NodeComponent } from "../types";

export const FirebaseStorageContext = createContext<
  FirebaseStorage | undefined
>(undefined);

type FirebaseStorageProviderProps = {
  storage: FirebaseStorage;
} & NodeComponent;

export const FirebaseStorageProvider = ({
  storage,
  children,
}: FirebaseStorageProviderProps) => {
  return (
    <FirebaseStorageContext.Provider value={storage}>
      {children}
    </FirebaseStorageContext.Provider>
  );
};
