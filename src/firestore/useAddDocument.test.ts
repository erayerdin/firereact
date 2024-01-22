// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import sleep from "sleep-sleep";
import { firestore } from "../firebase";
import useAddDocument from "./useAddDocument";

const colRef = collection(firestore, "useAddDocument");
const docRef = doc(firestore, "useAddDocument", "doc1");
const docData = { displayName: "Add Document" };

describe("initially useAddDocument hook", () => {
  it("should return ready", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument({ reference: colRef }));
    const { state } = result.current;
    expect(state).toBe("ready");

    // teardown
    await deleteDoc(docRef);
  });

  it("should return no reference", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument({ reference: colRef }));
    const { reference } = result.current;
    expect(reference).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });

  it("should return no error", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument({ reference: colRef }));
    const { error } = result.current;
    expect(error).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });
});

describe("after dispatched, useAddDocument hook", () => {
  it("should return done", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument({ reference: colRef }));
    const { dispatch } = result.current;
    await dispatch(docData);
    await sleep(200);

    const { state } = result.current;
    expect(state).toBe("done");

    // teardown
    await deleteDoc(docRef);
  });
});
