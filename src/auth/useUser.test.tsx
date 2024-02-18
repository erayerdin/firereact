// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import sleep from "sleep-sleep";
import { auth } from "../firebase";
import { useUser } from "./useUser";

describe("when real anon, useUser hook", () => {
  const RealAnonUserComponent = () => {
    const user = useUser(auth);
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

describe("when anon, useUser", () => {
  const AnonUserComponent = () => {
    const user = useUser(auth);
    return (
      <div>{user?.isAnonymous ? "anon detected" : "non anon detected"}</div>
    );
  };

  let credential: UserCredential;

  beforeEach(async () => {
    credential = await signInAnonymously(auth);
  });

  afterEach(async () => {
    await deleteUser(credential.user);
  });

  it("should return user instance", async () => {
    render(<AnonUserComponent />);
    await signInAnonymously(auth);
    await sleep(250);
    expect(screen.getByText("anon detected")).not.toBeUndefined();
  });
});

describe("when authed, useUser", () => {
  const AuthedUserComponent = () => {
    const user = useUser(auth);
    return <div>{user?.email}</div>;
  };

  let credential: UserCredential;
  const email = "useauthstate@firereact.erayerdin.com" as const; // camel case in email does not work
  const password = "111111" as const;

  beforeEach(async () => {
    credential = await createUserWithEmailAndPassword(auth, email, password);
  });

  afterEach(async () => {
    await deleteUser(credential.user);
  });

  it("should return user instance", async () => {
    render(<AuthedUserComponent />);
    await signInWithEmailAndPassword(auth, email, password);
    await sleep(250);
    expect(screen.getByText(email)).not.toBeUndefined();
  });
});
