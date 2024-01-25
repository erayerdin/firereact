// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { signOut } from "firebase/auth";
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
