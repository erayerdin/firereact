// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignOut } from ".";
import { auth } from "../firebase";

describe("when state is ready, SignOut component", () => {
  it("should render a custom button", async () => {
    render(
      <SignOut
        auth={auth}
        onReady={(dispatch) => (
          <button onClick={dispatch}>Sign Out the User</button>
        )}
      />,
    );
    expect(screen.getByText("Sign Out the User")).not.toBeUndefined();
  });

  it("should render the default button", async () => {
    render(<SignOut auth={auth} />);
    expect(screen.getByText("Sign Out")).not.toBeUndefined();
  });
});

describe("when state is done, SignOut component", () => {
  it("should render done", async () => {
    render(
      <SignOut
        auth={auth}
        onReady={(dispatch) => <button onClick={dispatch}>Sign Out</button>}
        onDone={() => <div>anon now</div>}
      />,
    );
    await userEvent.click(screen.getByText("Sign Out"));
    expect(screen.getByText("anon now")).not.toBeUndefined();
  });
});
