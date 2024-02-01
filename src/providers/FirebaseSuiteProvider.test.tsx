// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import {
  FirebaseAppContext,
  FirebaseAuthContext,
  FirebaseFunctionsContext,
  FirebaseStorageContext,
} from ".";
import app, { auth, firestore, functions, storage } from "../firebase";
import { FirebaseSuiteProvider } from "./FirebaseSuiteProvider";
import { FirestoreContext } from "./FirestoreProvider";

const SampleComponent = () => {
  const app = useContext(FirebaseAppContext);
  const firestore = useContext(FirestoreContext);
  const auth = useContext(FirebaseAuthContext);
  const functions = useContext(FirebaseFunctionsContext);
  const storage = useContext(FirebaseStorageContext);

  return (
    <>
      <div>Firebase app name: {app?.name}</div>
      <div>Firestore app name: {firestore?.app.name}</div>
      <div>Auth app name: {auth?.app.name}</div>
      <div>Functions app name: {functions?.app.name}</div>
      <div>Storage app name: {storage?.app.name}</div>
    </>
  );
};

it("suite app instance should be accessible", async () => {
  render(
    <FirebaseSuiteProvider
      app={app}
      firestore={firestore}
      auth={auth}
      functions={functions}
      storage={storage}
    >
      <SampleComponent />
    </FirebaseSuiteProvider>,
  );

  expect(screen.getByText("Firebase app name: [DEFAULT]").innerHTML).toBe(
    "Firebase app name: [DEFAULT]",
  );
  expect(screen.getByText("Firestore app name: [DEFAULT]").innerHTML).toBe(
    "Firestore app name: [DEFAULT]",
  );
  expect(screen.getByText("Auth app name: [DEFAULT]").innerHTML).toBe(
    "Auth app name: [DEFAULT]",
  );
  expect(screen.getByText("Functions app name: [DEFAULT]").innerHTML).toBe(
    "Functions app name: [DEFAULT]",
  );
  expect(screen.getByText("Storage app name: [DEFAULT]").innerHTML).toBe(
    "Storage app name: [DEFAULT]",
  );
});
