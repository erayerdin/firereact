// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { SignOut } from ".";
import { auth } from "../firebase";

const email = "signout@comp.com" as const;
const password = "111111" as const;

describe("when state is ready, SignOut component", () => {
  let credential: UserCredential;

  beforeEach(async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    credential = await signInWithEmailAndPassword(auth, email, password);
  });

  afterEach(async () => {
    await signOut(auth);
    await deleteUser(credential.user);
  });

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

describe("when state is anonymous, SignOut component", () => {
  it("should render anonymous", async () => {
    render(<SignOut auth={auth} onAnonymous={() => <div>anon now</div>} />);
    expect(screen.getByText("anon now")).not.toBeUndefined();
  });
});
