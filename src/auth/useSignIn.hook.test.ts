// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { renderHook } from "@testing-library/react";
import { useSignIn } from ".";
import { auth } from "../firebase";

const generateEmail = (id: string) => `usesignin_${id}@hook.com`;
const password = "111111" as const;

describe("when authed, useSignIn hook", () => {
  let credential: UserCredential;
  const index: number = 0;

  beforeEach(async () => {
    const email = generateEmail(index.toString());
    await createUserWithEmailAndPassword(auth, email, password);
    credential = await signInWithEmailAndPassword(auth, email, password);
  });

  afterEach(async () => {
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should have authenticated state", async () => {
    const { result } = renderHook(() => useSignIn());
    const { state } = result.current;
    expect(state).toBe("authenticated");
  });
});
