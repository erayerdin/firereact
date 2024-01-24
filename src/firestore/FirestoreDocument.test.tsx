// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { FirestoreDocument } from ".";

it("sample component test", async () => {
  render(<FirestoreDocument />);

  expect(screen.getByText("FirestoreDocument").innerHTML).toBe(
    "FirestoreDocument",
  );
});
