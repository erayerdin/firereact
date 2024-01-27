// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { signInAnonymously, signOut } from "firebase/auth";
import { useSignUp } from ".";
import { auth } from "../firebase";

describe("when real anon, useSignUp hook", () => {
  it("should have ready state", async () => {
    const { result } = renderHook(() => useSignUp());
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

  it("should have ready state", async () => {
    const { result } = renderHook(() => useSignUp());
    const { state } = result.current;
    expect(state).toBe("ready");
  });
});
