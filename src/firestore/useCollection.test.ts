// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import useCollection from "./useCollection";

const colRef = collection(firestore, "profiles");
const docRef = doc(firestore, "profiles", "profile1");
const docData = { displayName: "Vort the Wise" } as const;

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
