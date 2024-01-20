// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import sleep from "sleep-sleep";
import { firestore } from "../firebase";
import useDocument from "./useDocument";

const docRef = doc(firestore, "profiles", "profile1");
const docData = { displayName: "Vort the Wise" } as const;

describe("initially useDocument hook", () => {
  it("should be loading state", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useDocument({ reference: docRef }));
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
    const { result } = renderHook(() => useDocument({ reference: docRef }));
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
    const { result } = renderHook(() => useDocument({ reference: docRef }));
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
    const { result } = renderHook(() => useDocument({ reference: docRef }));
    await sleep(100);
    const { loading } = result.current;
    expect(loading).toBe(false);

    // teardown
    await deleteDoc(docRef);
  });

  it("later have no snapshot", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useDocument({ reference: docRef }));
    await sleep(100);
    const { snapshot } = result.current;
    expect(snapshot?.data()).toStrictEqual(docData);

    // teardown
    await deleteDoc(docRef);
  });

  it("later have no error", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    const { result } = renderHook(() => useDocument({ reference: docRef }));
    await sleep(100);
    const { error } = result.current;
    expect(error).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });
});
