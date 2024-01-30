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
import { AuthorizationZone, Validators } from ".";
import { auth } from "../firebase";

const generateEmail = (id: string) => `authenticatedzone_${id}@comp.com`;
const password = "111111" as const;

describe("Validators.isAuthenticated", () => {
  let credential: UserCredential;
  let index: number = 0;

  beforeEach(async () => {
    const email = generateEmail(index.toString());
    await createUserWithEmailAndPassword(auth, email, password);
    credential = await signInWithEmailAndPassword(auth, email, password);
    index++;
  });

  afterEach(async () => {
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should be default and succeed if authenticated", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        onSuccess={(user) => (
          <>
            <div>authed</div>
            <div>{user?.email ?? "email"}</div>
          </>
        )}
      />,
    );
    await sleep(50);
    expect(screen.getByText("authed")).not.toBeUndefined();
  });

  it("should be default and fail if firebase anon", async () => {
    // setup
    await signOut(auth);
    const credential = await signInAnonymously(auth);

    render(
      <AuthorizationZone
        auth={auth}
        onSuccess={(user) => (
          <>
            <div>authed</div>
            <div>{user?.email ?? "email"}</div>
          </>
        )}
        onFailure={() => <div>anon</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("anon")).not.toBeUndefined();

    // teardown
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should be default and fail if real anon", async () => {
    // setup
    await signOut(auth);

    render(
      <AuthorizationZone
        auth={auth}
        onSuccess={(user) => (
          <>
            <div>authed</div>
            <div>{user?.email ?? "email"}</div>
          </>
        )}
        onFailure={() => <div>anon</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("anon")).not.toBeUndefined();

    // teardown
    await signOut(auth);
  });
});

describe("Validators.isAnonymous", () => {
  it("should succeed if real anon", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.isAnonymous()}
        onSuccess={() => <div>anon</div>}
        onFailure={() => <div>authed</div>}
      />,
    );
    expect(screen.getByText("anon")).not.toBeUndefined();
  });

  it("should succeed if firebase anon", async () => {
    // setup
    await signOut(auth);
    const credential = await signInAnonymously(auth);

    // test
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.isAnonymous()}
        onSuccess={() => <div>anon</div>}
        onFailure={() => <div>authed</div>}
      />,
    );
    expect(screen.getByText("anon")).not.toBeUndefined();

    // tearmdown
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should fail if firebase anon and excludeFirebaseAnon", async () => {
    // setup
    await signOut(auth);
    const credential = await signInAnonymously(auth);

    // test
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.isAnonymous(true)}
        onSuccess={() => <div>anon</div>}
        onFailure={() => <div>authed</div>}
      />,
    );
    expect(screen.getByText("authed")).not.toBeUndefined();

    // tearmdown
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should fail if authenticated", async () => {
    // setup
    await signOut(auth);
    const email = generateEmail("failifauthenticated");
    await createUserWithEmailAndPassword(auth, email, password);
    const credential = await signInWithEmailAndPassword(auth, email, password);

    // test
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.isAnonymous()}
        onSuccess={() => <div>anon</div>}
        onFailure={() => <div>authed</div>}
      />,
    );
    expect(screen.getByText("authed")).not.toBeUndefined();

    // teardown
    await signOut(auth);
    await deleteUser(credential.user);
  });
});

describe("Validators.every", () => {
  it("should return true if all async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.every([
          async () => true,
          async () => true,
          async () => true,
          async () => true,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("passed")).not.toBeUndefined();
  });

  it("should return false if all async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.every([
          async () => true,
          async () => true,
          async () => false,
          async () => true,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    expect(screen.getByText("failed")).not.toBeUndefined();
  });

  it("should return true if all non-async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.every([
          () => true,
          () => true,
          () => true,
          () => true,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("passed")).not.toBeUndefined();
  });

  it("should return false if all non-async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.every([
          () => true,
          () => true,
          () => false,
          () => true,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    expect(screen.getByText("failed")).not.toBeUndefined();
  });

  it("should return true if async and non-async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.every([
          async () => true,
          () => true,
          async () => true,
          () => true,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("passed")).not.toBeUndefined();
  });

  it("should return false if async and non-async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.every([
          async () => true,
          () => true,
          async () => false,
          () => true,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    expect(screen.getByText("failed")).not.toBeUndefined();
  });
});

describe("Validators.some", () => {
  it("should return true if all async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.some([
          async () => false,
          async () => false,
          async () => false,
          async () => true,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("passed")).not.toBeUndefined();
  });

  it("should return false if all async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.some([
          async () => false,
          async () => false,
          async () => false,
          async () => false,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    expect(screen.getByText("failed")).not.toBeUndefined();
  });

  it("should return true if all non-async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.some([
          () => false,
          () => false,
          () => true,
          () => true,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("passed")).not.toBeUndefined();
  });

  it("should return false if all non-async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.some([
          () => false,
          () => false,
          () => false,
          () => false,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    expect(screen.getByText("failed")).not.toBeUndefined();
  });

  it("should return true if async and non-async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.some([
          async () => false,
          () => true,
          async () => false,
          () => false,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("passed")).not.toBeUndefined();
  });

  it("should return false if async and non-async", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.some([
          async () => false,
          () => false,
          async () => false,
          () => false,
        ])}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    expect(screen.getByText("failed")).not.toBeUndefined();
  });
});

describe("Validators.isVerified", () => {
  let credential: UserCredential;
  const index: number = 0;

  beforeEach(async () => {
    const email = generateEmail(index.toString());
    await createUserWithEmailAndPassword(auth, email, password);
    credential = await signInWithEmailAndPassword(auth, email, password);
  });

  afterEach(async () => {
    await signOut(auth);
    await deleteUser(credential.user);
  });

  it("should return false", async () => {
    render(
      <AuthorizationZone
        auth={auth}
        validator={Validators.isVerified()}
        onSuccess={() => <div>passed</div>}
        onFailure={() => <div>failed</div>}
      />,
    );
    await sleep(50);
    expect(screen.getByText("failed")).not.toBeUndefined();
  });
});
