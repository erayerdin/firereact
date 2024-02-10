// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import sleep from "sleep-sleep";
import { firestore } from "../firebase";
import { useSetDocument } from "./useSetDocument";

const docRef = doc(firestore, "useSetDocument", "doc1");
const docData = { displayName: "Use Set Document" };

describe("initially useSetDocument hook", () => {
  it("should return ready", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useSetDocument(docRef));
    const { state } = result.current;
    expect(state).toBe("ready");

    // teardown
    await deleteDoc(docRef);
  });

  it("should return no error", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useSetDocument(docRef));
    const { error } = result.current;
    expect(error).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });
});

describe("as soon as dispatched, useSetDocument hook", () => {
  // it's too hard to guess how many ms to wait to check loading state
  it.skip("should return loading", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useSetDocument(docRef));
    const { dispatch } = result.current;
    dispatch(docData);
    await sleep(30);

    const { state } = result.current;
    expect(state).toBe("loading");

    // teardown
    await deleteDoc(docRef);
  });
});

describe("after dispatched, useSetDocument hook", () => {
  it("should return done", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useSetDocument(docRef));
    const { dispatch } = result.current;
    await dispatch(docData);
    await sleep(250);

    const { state } = result.current;
    expect(state).toBe("done");

    // teardown
    await deleteDoc(docRef);
  });

  it("should really set document", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useSetDocument(docRef));
    const { dispatch } = result.current;
    await dispatch(docData);
    await sleep(250);

    const docSnapshot = await getDoc(docRef);
    expect(docSnapshot.exists()).toBe(true);

    // teardown
    await deleteDoc(docRef);
  });

  it("should merge into document", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, { displayName: "Use Set Document" });

    // test
    const { result } = renderHook(() => useSetDocument(docRef));
    const { dispatch } = result.current;
    await dispatch({ username: "useSetDocument" }, { merge: true });
    await sleep(250);

    const docSnapshot = await getDoc(docRef);
    expect(docSnapshot.data()).toStrictEqual({
      displayName: "Use Set Document",
      username: "useSetDocument",
    });

    // teardown
    await deleteDoc(docRef);
  });
});
