// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { FirestoreDocument } from ".";

describe("initially FirestoreDocument component", () => {
  it("should return loading", async () => {
    render(<FirestoreDocument loading={() => <div>Loading...</div>} />);

    expect(screen.getByText("Loading...").innerHTML).toBe("Loading...");
  });
});
