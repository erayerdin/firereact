// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import {
  UserCredential,
  deleteUser,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { useDeleteUser } from ".";
import { auth } from "../firebase";

describe("when real anon, useDeleteUser hook", () => {
  beforeEach(async () => {
    await signOut(auth);
  });

  it("should have anonymous state", async () => {
    const { result } = renderHook(() => useDeleteUser());
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
    const { result } = renderHook(() => useDeleteUser());
    const { state } = result.current;
    expect(state).toBe("anonymous");
  });
});
