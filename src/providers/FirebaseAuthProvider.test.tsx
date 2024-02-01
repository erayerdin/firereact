// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { FirebaseAuthContext, FirebaseAuthProvider } from ".";
import { auth } from "../firebase";

const SampleComponent = () => {
  const auth = useContext(FirebaseAuthContext);
  return <div>{auth?.app.name}</div>;
};

it("firebase auth instance should be accessible", async () => {
  render(
    <FirebaseAuthProvider auth={auth}>
      <SampleComponent />
    </FirebaseAuthProvider>,
  );

  expect(screen.getByText("[DEFAULT]").innerHTML).toBe("[DEFAULT]");
});
