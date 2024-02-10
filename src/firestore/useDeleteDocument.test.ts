// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import sleep from "sleep-sleep";
import { firestore } from "../firebase";
import { useDeleteDocument } from "./useDeleteDocument";

const docRef = doc(firestore, "useDeleteDocument", "doc1");

describe("initially useDeleteDocument hook", () => {
  it("should return ready", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useDeleteDocument(docRef));
    const { state } = result.current;
    expect(state).toBe("ready");

    // teardown
    await deleteDoc(docRef);
  });

  it("should return no error", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useDeleteDocument(docRef));
    const { error } = result.current;
    expect(error).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });
});

describe("as soon as dispatched, useDeleteDocument hook", () => {
  // it's too hard to guess how many ms to wait to check loading state
  it.skip("should return loading", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useDeleteDocument(docRef));
    const { dispatch } = result.current;
    dispatch();
    await sleep(30);

    const { state } = result.current;
    expect(state).toBe("loading");

    // teardown
    await deleteDoc(docRef);
  });
});

describe("after dispatched, useDeleteDocument hook", () => {
  it("should return done", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useDeleteDocument(docRef));
    const { dispatch } = result.current;
    await dispatch();
    await sleep(250);

    const { state } = result.current;
    expect(state).toBe("done");

    // teardown
    await deleteDoc(docRef);
  });

  it("should really delete document", async () => {
    // setup
    await setDoc(docRef, { displayName: "Use Delete Document" });

    // test
    const { result } = renderHook(() => useDeleteDocument(docRef));
    const { dispatch } = result.current;
    await dispatch();
    await sleep(250);

    const docSnapshot = await getDoc(docRef);
    expect(docSnapshot.exists()).toBe(false);

    // teardown
    await deleteDoc(docRef);
  });
});
