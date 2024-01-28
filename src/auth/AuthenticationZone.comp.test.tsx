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
import { AuthenticationZone } from ".";
import { auth } from "../firebase";

const generateEmail = (id: string) => `authenticatedzone_${id}@comp.com`;
const password = "111111" as const;

describe("when authenticated, AuthenticatedZone component", () => {
  let credential: UserCredential;
  let index: number = 0;

  beforeEach(async () => {
    const email = generateEmail(index.toString());
    await createUserWithEmailAndPassword(auth, email, password);
    credential = await signInWithEmailAndPassword(auth, email, password);
    index++;
  });

  afterEach(async () => {
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should render children", async () => {
    render(
      <AuthenticationZone
        auth={auth}
        onAuthenticated={(user) => (
          <>
            <div>authed</div>
            <div>{user.email}</div>
          </>
        )}
        onAnonymous={() => <div>anon</div>}
      />,
    );
    expect(screen.getByText("authed")).not.toBeUndefined();
  });
});
