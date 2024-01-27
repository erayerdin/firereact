// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { SignOut } from ".";

describe("when state is ready, SignOut component", () => {
  it("should render a button", async () => {
    render(<SignOut onReady={() => <button>Sign Out</button>} />);
    expect(screen.getByText("Sign Out")).not.toBeUndefined();
  });
});
