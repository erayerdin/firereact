// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import useDocument from "./useDocument";

describe("useDocument hook", () => {
  it("should be initially loading state", async () => {
    // setup
    console.log("setting up");
    const docRef = doc(firestore, "profiles", "profile1");
    await deleteDoc(docRef);
    await setDoc(docRef, { displayName: "Vort the Wise" });

    // test
    const { result } = renderHook(() => useDocument({ reference: docRef }));
    const { loading } = result.current;
    expect(loading).toBe(true);

    // teardown
    await deleteDoc(docRef);
  });
});
