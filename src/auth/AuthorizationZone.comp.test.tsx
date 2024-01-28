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
import sleep from "sleep-sleep";
import { AuthorizationZone } from ".";
import { auth } from "../firebase";

const generateEmail = (id: string) => `authenticatedzone_${id}@comp.com`;
const password = "111111" as const;

describe("Validators.isAuthenticated", () => {
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

  it("should be default and succeed if authenticated", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        onSuccess={(user) => (
          <>
            <div>authed</div>
            <div>{user?.email ?? "email"}</div>
          </>
        )}
      />,
    );
    await sleep(50);
    expect(screen.getByText("authed")).not.toBeUndefined();
  });
});
