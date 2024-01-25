// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { signOut } from "firebase/auth";
import { useAuthState } from ".";
import { auth } from "../firebase";

describe("when anon anon, useAuthState hook", () => {
  beforeAll(async () => {
    await signOut(auth);
  });

  it("should not return user instance", async () => {
    const { result } = renderHook(() => useAuthState({ auth }));
    const { user } = result.current;
    expect(user).toBeNull();
  });
});
