// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Functions } from "firebase/functions";
import { FirebaseStorage } from "firebase/storage";
import {
  FirebaseAuthProvider,
  FirebaseFunctionsProvider,
  FirebaseProvider,
  FirebaseStorageProvider,
  FirestoreProvider,
} from ".";
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
  auth?: Auth;
  functions?: Functions;
  storage?: FirebaseStorage;
} & NodeComponent;

export const FirebaseSuiteProvider = ({
  app,
  firestore,
  auth,
  functions,
  storage,
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
        <ConditionalWrap
          condition={auth !== undefined}
          wrap={(c) => (
            <FirebaseAuthProvider auth={auth!}>{c}</FirebaseAuthProvider>
          )}
        >
          <ConditionalWrap
            condition={functions !== undefined}
            wrap={(c) => (
              <FirebaseFunctionsProvider functions={functions!}>
                {c}
              </FirebaseFunctionsProvider>
            )}
          >
            <ConditionalWrap
              condition={storage !== undefined}
              wrap={(c) => (
                <FirebaseStorageProvider storage={storage!}>
                  {c}
                </FirebaseStorageProvider>
              )}
            >
              {children}
            </ConditionalWrap>
          </ConditionalWrap>
        </ConditionalWrap>
      </ConditionalWrap>
    </ConditionalWrap>
  );
};
