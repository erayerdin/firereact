// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, renderHook, screen } from "@testing-library/react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import sleep from "sleep-sleep";
import { useSignOut, useUser } from ".";
import { auth } from "../firebase";

const email = "usesignout@hook.com" as const;
const password = "111111";

const SampleComponent = () => {
  const user = useUser(auth);

  return <div>{user ? "authed" : "real anon"}</div>;
};

describe("when authed, useSignOut hook", () => {
  let credential: UserCredential;

  beforeEach(async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    credential = await signInWithEmailAndPassword(auth, email, password);
  });

  afterEach(async () => {
    await deleteUser(credential.user);
  });

  it("should have ready state", () => {
    const { result } = renderHook(() => useSignOut(auth));
    expect(result.current.state).toBe("ready");
  });
  {
    auth;
  }
  it("should sign out", async () => {
    render(<SampleComponent />);
    const { result } = renderHook(() => useSignOut(auth));
    const { dispatch } = result.current;
    await dispatch();
    await sleep(100);
    expect(screen.getByText("real anon")).not.toBeUndefined();
  });

  it("should have anonymous state after dispatched", async () => {
    render(<SampleComponent />);
    const { result } = renderHook(() => useSignOut(auth));
    const { dispatch } = result.current;
    await dispatch();
    await sleep(100);
    const { state } = result.current;
    expect(state).toBe("anonymous");
  });
});

describe("when real anon, useSignOut hook", () => {
  it("should have anonymous state", () => {
    const { result } = renderHook(() => useSignOut(auth));
    expect(result.current.state).toBe("anonymous");
  });
});

describe("when anon, useSignOut hook", () => {
  beforeEach(async () => {
    await signInAnonymously(auth);
  });

  it("should have anonymous state", () => {
    const { result } = renderHook(() => useSignOut(auth));
    expect(result.current.state).toBe("anonymous");
  });

  it("should have ready state if onlyRealAnon", () => {
    const { result } = renderHook(() =>
      useSignOut(auth, { onlyRealAnon: true }),
    );
    expect(result.current.state).toBe("ready");
  });
});
