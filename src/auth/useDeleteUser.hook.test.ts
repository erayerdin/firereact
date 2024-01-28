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
import { useDeleteUser } from ".";
import { auth } from "../firebase";

const generateEmail = (id: string) => `usedeleteuser_${id}@hook.com`;
const password = "111111" as const;

describe("when real anon, useDeleteUser hook", () => {
  beforeEach(async () => {
    await signOut(auth);
  });

  it("should have anonymous state", async () => {
    const { result } = renderHook(() => useDeleteUser({ auth }));
    const { state } = result.current;
    expect(state).toBe("anonymous");
  });
});

describe("when anon, useDeleteUser hook", () => {
  let credential: UserCredential;

  beforeEach(async () => {
    credential = await signInAnonymously(auth);
  });

  afterEach(async () => {
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should have anonymous state", async () => {
    const { result } = renderHook(() => useDeleteUser({ auth }));
    const { state } = result.current;
    expect(state).toBe("anonymous");
  });
});

describe("when authed, useDeleteUser hook", () => {
  let credential: UserCredential;
  let emailIndex: number = 0;

  beforeEach(async () => {
    const email = generateEmail(emailIndex.toString());

    await createUserWithEmailAndPassword(auth, email, password);
    credential = await signInWithEmailAndPassword(
      auth,
      generateEmail(emailIndex.toString()),
      password,
    );
    emailIndex++;
  });

  afterEach(async () => {
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should have ready state", async () => {
    const { result } = renderHook(() => useDeleteUser({ auth }));
    const { state } = result.current;
    expect(state).toBe("ready");
  });
});
