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
import { AuthorizationZone } from ".";
import { auth } from "../firebase";

const generateEmail = (id: string) => `authenticatedzone_${id}@comp.com`;
const password = "111111" as const;

const component = (excludeFirebaseAnon = false) => (
  <AuthorizationZone
    auth={auth}
    excludeFirebaseAnon={excludeFirebaseAnon}
    onAuthenticated={(user) => (
      <>
        <div>authed</div>
        <div>{user.email}</div>
      </>
    )}
    onAnonymous={() => <div>anon</div>}
  />
);

describe("when authenticated, AuthorizationZone component", () => {
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

  it("should render onAuthenticated", async () => {
    render(component());
    expect(screen.getByText("authed")).not.toBeUndefined();
  });
});

describe("when anon, AuthorizationZone component", () => {
  it("should render onAnonymous if real anon", async () => {
    render(component());
    expect(screen.getByText("anon")).not.toBeUndefined();
  });

  it("should render onAnonymous if firebase anon", async () => {
    // setup
    const credential = await signInAnonymously(auth);

    // test
    render(component());
    expect(screen.getByText("anon")).not.toBeUndefined();

    // teardown
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should render onAuthenticated if firebase anon and excludeFirebaseAnon", async () => {
    // setup
    const credential = await signInAnonymously(auth);

    // test
    render(component(true));
    expect(screen.getByText("authed")).not.toBeUndefined();

    // teardown
    await signOut(auth);
    await deleteUser(credential.user);
  });
});
