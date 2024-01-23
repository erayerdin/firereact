// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import sleep from "sleep-sleep";
import useCollection from "../src/firestore/useCollection";
import { firestore } from "./firebase";

const colRef = collection(firestore, "useCollection");
const docRef = doc(firestore, "useCollection", "doc1");
const docData = { displayName: "Use Collection" } as const;

describe("initially useCollection hook", () => {
  it("should be loading state", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useCollection({ query: colRef }));
    const { loading } = result.current;
    expect(loading).toBe(true);

    // teardown
    await deleteDoc(docRef);
  });

  it("should have no snapshot", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useCollection({ query: colRef }));
    const { snapshot } = result.current;
    expect(snapshot).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });

  it("should have no error", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useCollection({ query: colRef }));
    const { error } = result.current;
    expect(error).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });
});

describe("later useCollection hook", () => {
  it("should not be loading state", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useCollection({ query: colRef }));
    await sleep(250);
    const { loading } = result.current;
    expect(loading).toBe(false);

    // teardown
    await deleteDoc(docRef);
  });

  it("have a snapshot", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useCollection({ query: colRef }));
    await sleep(250);
    const { snapshot } = result.current;
    expect(snapshot?.size).toBeGreaterThan(0);

    // teardown
    await deleteDoc(docRef);
  });

  it("have no error", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useCollection({ query: colRef }));
    await sleep(250);
    const { error } = result.current;
    expect(error).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });
});
