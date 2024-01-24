// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { firestore } from "../firebase";
import { FirestoreContext, FirestoreProvider } from "./FirestoreProvider";

const SampleComponent = () => {
  const firestore = useContext(FirestoreContext);
  return <div>{firestore?.app.name}</div>;
};

it("firestore instance should be accessible", async () => {
  render(
    <FirestoreProvider firestore={firestore}>
      <SampleComponent />
    </FirestoreProvider>,
  );

  expect(screen.getByText("[DEFAULT]").innerHTML).toBe("[DEFAULT]");
});
