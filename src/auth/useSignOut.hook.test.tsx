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
} from "firebase/auth";
import { useSignOut } from ".";
import { auth } from "../firebase";

const email = "usesignout@hook.com" as const;
const password = "111111";

const SampleComponent = () => {
  const currentUser = auth.currentUser;

  return <div>{currentUser ? "authed" : "real anon"}</div>;
};

describe("when authed, useSignOut hook", () => {
  let credential: UserCredential;

  beforeEach(async () => {
    credential = await createUserWithEmailAndPassword(auth, email, password);
    await signInWithEmailAndPassword(auth, email, password);
  });

  afterAll(async () => {
    await deleteUser(credential.user);
  });

  it("should have ready state", () => {
    const { result } = renderHook(() => useSignOut({ auth }));
    expect(result.current.state).toBe("ready");
  });
});
