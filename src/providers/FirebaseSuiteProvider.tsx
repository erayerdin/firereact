// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import { FirebaseProvider, FirestoreProvider } from ".";
import { NodeComponent } from "../types";

type ConditionalWrapProps = {
  condition: boolean;
  wrap: (children: React.ReactNode) => React.ReactNode;
} & NodeComponent;

const ConditionalWrap = ({
  condition,
  wrap,
  children,
}: ConditionalWrapProps) => (condition ? wrap(children) : children);

type FirebaseSuiteProviderProps = {
  app?: FirebaseApp;
  firestore?: Firestore;
} & NodeComponent;

export const FirebaseSuiteProvider = ({
  app,
  firestore,
  children,
}: FirebaseSuiteProviderProps) => {
  return (
    <ConditionalWrap
      condition={app !== undefined}
      wrap={(c) => <FirebaseProvider app={app!}>{c}</FirebaseProvider>}
    >
      <ConditionalWrap
        condition={firestore !== undefined}
        wrap={(c) => (
          <FirestoreProvider firestore={firestore!}>{c}</FirestoreProvider>
        )}
      >
        {children}
      </ConditionalWrap>
    </ConditionalWrap>
  );
};
