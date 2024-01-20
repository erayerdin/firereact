// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import useDocument from "./useDocument";

const docRef = doc(firestore, "profiles", "profile1");
const docData = { displayName: "Vort the Wise" } as const;

describe("useDocument hook", () => {
  it("should be initially loading state", async () => {
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

  it("should initially have no snapshot", async () => {
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
});
