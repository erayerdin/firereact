// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useSignUp } from ".";
import { auth } from "../firebase";

describe("when real anon, useSignUp hook", () => {
  it("should have ready state", async () => {
    const { result } = renderHook(() => useSignUp({ auth }));
    const { state } = result.current;
    expect(state).toBe("ready");
  });
});

describe("when anon, useSignUp hook", () => {
  beforeEach(async () => {
    await signInAnonymously(auth);
  });

  afterEach(async () => {
    await signOut(auth);
  });

  it("should have ready state if not only real anon", async () => {
    const { result } = renderHook(() =>
      useSignUp({ auth, onlyRealAnon: false }),
    );
    const { state } = result.current;
    expect(state).toBe("ready");
  });
});

describe("when anon, useSignUp hook", () => {
  const email = "usesignup@hook.com" as const;
  const password = "111111" as const;
  let credential: UserCredential;

  beforeEach(async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    credential = await signInWithEmailAndPassword(auth, email, password);
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
