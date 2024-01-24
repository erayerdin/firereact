// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { FirebaseAppContext } from ".";
import app, { firestore } from "../firebase";
import { FirebaseSuiteProvider } from "./FirebaseSuiteProvider";
import { FirestoreContext } from "./FirestoreProvider";

const SampleComponent = () => {
  const app = useContext(FirebaseAppContext);
  const firestore = useContext(FirestoreContext);

  return (
    <>
      <div>Firebase app name: {app?.name}</div>
      <div>Firestore app name: {firestore?.app.name}</div>
    </>
  );
};

it("suite app instance should be accessible", async () => {
  render(
    <FirebaseSuiteProvider app={app} firestore={firestore}>
      <SampleComponent />
    </FirebaseSuiteProvider>,
  );

  expect(screen.getByText("Firebase app name: [DEFAULT]").innerHTML).toBe(
    "Firebase app name: [DEFAULT]",
  );
  expect(screen.getByText("Firestore app name: [DEFAULT]").innerHTML).toBe(
    "Firestore app name: [DEFAULT]",
  );
});
