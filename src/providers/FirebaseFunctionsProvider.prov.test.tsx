// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { FirebaseFunctionsContext, FirebaseFunctionsProvider } from ".";
import { functions } from "../firebase";

const SampleComponent = () => {
  const functions = useContext(FirebaseFunctionsContext);
  return <div>{functions?.app.name}</div>;
};

it("firebase functions instance should be accessible", async () => {
  render(
    <FirebaseFunctionsProvider functions={functions}>
      <SampleComponent />
    </FirebaseFunctionsProvider>,
  );

  expect(screen.getByText("[DEFAULT]").innerHTML).toBe("[DEFAULT]");
});
