// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Functions } from "firebase/functions";
import { createContext } from "react";
import { NodeComponent } from "../types";

export const FirebaseFunctionsContext = createContext<Functions | undefined>(
  undefined,
);

type FirebaseFunctionsProviderProps = {
  functions: Functions;
} & NodeComponent;

export const FirebaseFunctionsProvider = ({
  functions,
  children,
}: FirebaseFunctionsProviderProps) => {
  return (
    <FirebaseFunctionsContext.Provider value={functions}>
      {children}
    </FirebaseFunctionsContext.Provider>
  );
};
