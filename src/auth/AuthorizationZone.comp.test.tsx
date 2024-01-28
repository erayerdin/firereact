// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import sleep from "sleep-sleep";
import { AuthorizationZone, Validators } from ".";
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

  it("should be default and fail if firebase anon", async () => {
    // setup
    await signOut(auth);
    const credential = await signInAnonymously(auth);

    render(
      <AuthorizationZone
        auth={auth}
        onSuccess={(user) => (
          <>
            <div>authed</div>
            <div>{user?.email ?? "email"}</div>
          </>
        )}
        onFailure={() => <div>anon</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("anon")).not.toBeUndefined();

    // teardown
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should be default and fail if real anon", async () => {
    // setup
    await signOut(auth);

    render(
      <AuthorizationZone
        auth={auth}
        onSuccess={(user) => (
          <>
            <div>authed</div>
            <div>{user?.email ?? "email"}</div>
          </>
        )}
        onFailure={() => <div>anon</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("anon")).not.toBeUndefined();

    // teardown
    await signOut(auth);
  });
});

describe("Validators.isAnonymous", () => {
  it("should succeed if real anon", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.isAnonymous()}
        onSuccess={() => <div>anon</div>}
        onFailure={() => <div>authed</div>}
      />,
    );
    expect(screen.getByText("anon")).not.toBeUndefined();
  });
});
