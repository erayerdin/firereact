// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignOut } from ".";
import { auth } from "../firebase";

describe("when state is ready, SignOut component", () => {
  it("should render a button", async () => {
    render(<SignOut auth={auth} onReady={() => <button>Sign Out</button>} />);
    expect(screen.getByText("Sign Out")).not.toBeUndefined();
  });
});

describe("when state is done, SignOut component", () => {
  it("should render done", async () => {
    render(
      <SignOut
        auth={auth}
        onReady={() => <button>Sign Out</button>}
        onDone={() => <div>Authed</div>}
      />,
    );
    await userEvent.click(screen.getByText("Sign Out"));
    expect(screen.getByText("Authed")).not.toBeUndefined();
  });
});
