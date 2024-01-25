// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { deleteUser, signInAnonymously, signOut } from "firebase/auth";
import sleep from "sleep-sleep";
import { useAuthState } from ".";
import { auth } from "../firebase";

describe("when real anon, useAuthState hook", () => {
  const RealAnonUserComponent = () => {
    const { user } = useAuthState({ auth });
    return <div>{user ? "not real anon detected" : "real anon detected"}</div>;
  };

  beforeAll(async () => {
    await signOut(auth);
  });

  it("should not return user instance", async () => {
    render(<RealAnonUserComponent />);
    expect(screen.getByText("real anon detected")).not.toBeUndefined();
  });
});

describe("when anon, useAuthState", () => {
  const AnonUserComponent = () => {
    const { user } = useAuthState({ auth });
    return (
      <div>{user?.isAnonymous ? "anon detected" : "non anon detected"}</div>
    );
  };

  it("should return user instance", async () => {
    render(<AnonUserComponent />);
    const credential = await signInAnonymously(auth);
    await sleep(250);
    expect(screen.getByText("anon detected")).not.toBeUndefined();

    // teardown
    await deleteUser(credential.user);
  });
});
