// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useSignUp } from ".";
import { auth } from "../firebase";

const username = "usesignup@hoo.com" as const;
const password = "111111" as const;

describe("when authed, useSignUp hook", () => {
  let credential: UserCredential;

  beforeEach(async () => {
    await createUserWithEmailAndPassword(auth, username, password);
    credential = await signInWithEmailAndPassword(auth, username, password);
  });

  afterEach(async () => {
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should have authenticated state", async () => {
    const { result } = renderHook(() => useSignUp({ auth }));
    const { state } = result.current;
    expect(state).toBe("authenticated");
  });
});

describe("when real anon, useSignUp hook", () => {
  it("should have ready state", async () => {
    const { result } = renderHook(() => useSignUp({ auth }));
    const { state } = result.current;
    expect(state).toBe("ready");
  });
});
