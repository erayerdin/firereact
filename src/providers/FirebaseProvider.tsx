import { FirebaseApp } from "firebase/app";
import { createContext } from "react";
import { NodeComponent } from "../types";

export const FirebaseAppContext = createContext<FirebaseApp | undefined>(
  undefined,
);

type FirebaseProviderProps = {
  app: FirebaseApp;
} & NodeComponent;

export const FirebaseProvider = ({ app, children }: FirebaseProviderProps) => {
  return (
    <FirebaseAppContext.Provider value={app}>
      {children}
    </FirebaseAppContext.Provider>
  );
};
