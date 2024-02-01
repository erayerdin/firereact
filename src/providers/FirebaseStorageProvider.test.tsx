// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { FirebaseStorageContext, FirebaseStorageProvider } from ".";
import { storage } from "../firebase";

const SampleComponent = () => {
  const storage = useContext(FirebaseStorageContext);
  return <div>{storage?.app.name}</div>;
};

it("storage instance should be accessible", async () => {
  render(
    <FirebaseStorageProvider storage={storage}>
      <SampleComponent />
    </FirebaseStorageProvider>,
  );

  expect(screen.getByText("[DEFAULT]")).not.toBeUndefined();
});
