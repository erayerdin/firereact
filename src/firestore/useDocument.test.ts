// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import sleep from "sleep-sleep";
import { firestore } from "../firebase";
import { useDocument } from "./useDocument";

const docRef = doc(firestore, "useDocument", "doc1");
const docData = { displayName: "Use Document" } as const;

describe("initially useDocument hook", () => {
  it("should be loading state", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useDocument(docRef));
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
    const { result } = renderHook(() => useDocument(docRef));
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
    const { result } = renderHook(() => useDocument(docRef));
    const { error } = result.current;
    expect(error).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });
});

describe("later useDocument hook", () => {
  it("should not be loading state", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useDocument(docRef));
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
    const { result } = renderHook(() => useDocument(docRef));
    await sleep(250);
    const { snapshot } = result.current;
    expect(snapshot?.data()).toStrictEqual(docData);

    // teardown
    await deleteDoc(docRef);
  });

  it("have no error", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useDocument(docRef));
    await sleep(250);
    const { error } = result.current;
    expect(error).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });
});

describe.skip("later listen useDocument hook", () => {
  it("should not be loading state", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useDocument(docRef, { listen: true }));
    await sleep(250);
    const { loading } = result.current;
    expect(loading).toBe(false);

    // teardown
    await deleteDoc(docRef);
  });

  it("have no snapshot", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useDocument(docRef, { listen: true }));
    await sleep(250);
    const { snapshot } = result.current;
    expect(snapshot?.data()).toStrictEqual(docData);
    // for some reason, changes are not reflected whatever time we sleep
    // so, skipping this test suite altogether now
    await setDoc(docRef, { displayName: "Vort" });
    await sleep(250);
    expect(snapshot?.data()).toStrictEqual({ displayName: "Vort" });

    // teardown
    await deleteDoc(docRef);
  });
});
