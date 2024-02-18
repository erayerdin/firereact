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
import sleep from "sleep-sleep";
import { useSignUp } from ".";
import { auth } from "../firebase";

const generateEmail = (id: string) => `usesignup_${id}@hook.com`;
const password = "111111" as const;

describe("when authed, useSignUp hook", () => {
  let credential: UserCredential;

  beforeEach(async () => {
    await createUserWithEmailAndPassword(
      auth,
      generateEmail("authed"),
      password,
    );
    credential = await signInWithEmailAndPassword(
      auth,
      generateEmail("authed"),
      password,
    );
  });

  afterEach(async () => {
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should have authenticated state", async () => {
    const { result } = renderHook(() => useSignUp(auth));
    const { state } = result.current;
    expect(state).toBe("authenticated");
  });
});

describe("when real anon, useSignUp hook", () => {
  it("should have ready state", async () => {
    const { result } = renderHook(() => useSignUp(auth));
    const { state } = result.current;
    expect(state).toBe("ready");
  });

  it("should have loading state while dispatched", async () => {
    const { result } = renderHook(() => useSignUp(auth));
    const { dispatch } = result.current;
    dispatch(generateEmail("realanon"), password)
      .then(async (credential) => {
        // teardown
        await signOut(auth);
        if (credential) {
          await deleteUser(credential.user);
        }
      })
      .catch(() => {});
    await sleep(5);
    const { state } = result.current;
    expect(state).toBe("loading");
  });

  it("should sign up", async () => {
    const { result } = renderHook(() => useSignUp(auth));
    const { dispatch } = result.current;
    await dispatch(generateEmail("realanon2"), password);
    const localCredential = await signInWithEmailAndPassword(
      auth,
      generateEmail("realanon2"),
      password,
    );
    expect(localCredential.user.email).toBe(generateEmail("realanon2"));

    // teardown
    await signOut(auth);
    await deleteUser(localCredential.user);
  });
});

describe("when anon, useSignUp hook", () => {
  let credential: UserCredential;

  beforeEach(async () => {
    credential = await signInAnonymously(auth);
  });

  afterEach(async () => {
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should have ready state", () => {
    const { result } = renderHook(() => useSignUp(auth));
    const { state } = result.current;
    expect(state).toBe("ready");
  });

  it("should sign up", async () => {
    const { result } = renderHook(() => useSignUp(auth));
    const { dispatch } = result.current;
    await dispatch(generateEmail("anon"), password);
    const localCredential = await signInWithEmailAndPassword(
      auth,
      generateEmail("anon"),
      password,
    );
    expect(localCredential.user.email).toBe(generateEmail("anon"));

    // teardown
    await signOut(auth);
    await deleteUser(localCredential.user);
  });
});
