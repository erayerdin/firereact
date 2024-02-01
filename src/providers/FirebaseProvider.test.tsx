// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { FirebaseAppContext, FirebaseProvider } from ".";
import app from "../firebase";

const SampleComponent = () => {
  const app = useContext(FirebaseAppContext);
  return <div>{app?.name}</div>;
};

it("firebase instance should be accessible", async () => {
  render(
    <FirebaseProvider app={app}>
      <SampleComponent />
    </FirebaseProvider>,
  );

  expect(screen.getByText("[DEFAULT]").innerHTML).toBe("[DEFAULT]");
});
