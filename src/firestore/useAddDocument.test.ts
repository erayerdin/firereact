// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { sleep } from "../test.utils";
import { useAddDocument } from "./useAddDocument";

const colRef = collection(firestore, "useAddDocument");
const docRef = doc(firestore, "useAddDocument", "doc1");
const docData = { displayName: "Use Add Document" };

describe("initially useAddDocument hook", () => {
  it("should return ready", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument(colRef));
    const { state } = result.current;
    expect(state).toBe("ready");

    // teardown
    await deleteDoc(docRef);
  });

  it("should return no reference", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument(colRef));
    const { reference } = result.current;
    expect(reference).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });

  it("should return no error", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument(colRef));
    const { error } = result.current;
    expect(error).toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });
});

describe("as soon as dispatched, useAddDocument hook", () => {
  // it's too hard to guess how many ms to wait to check loading state
  it.skip("should return loading", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument(colRef));
    const { dispatch } = result.current;
    dispatch(docData);
    await sleep(30);

    const { state } = result.current;
    expect(state).toBe("loading");

    // teardown
    await deleteDoc(docRef);
  });
});

describe("after dispatched, useAddDocument hook", () => {
  it("should return done", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument(colRef));
    const { dispatch } = result.current;
    await dispatch(docData);
    await sleep(250);

    const { state } = result.current;
    expect(state).toBe("done");

    // teardown
    await deleteDoc(docRef);
  });

  it("should return reference", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument(colRef));
    const { dispatch } = result.current;
    await dispatch(docData);
    await sleep(250);

    const { reference } = result.current;
    expect(reference).not.toBeUndefined();

    // teardown
    await deleteDoc(docRef);
  });

  it("should really add document", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() => useAddDocument(colRef));
    const { dispatch } = result.current;
    await dispatch(docData);
    await sleep(250);

    const { reference } = result.current;
    const docSnapshot = await getDoc(reference!);
    expect(docSnapshot.exists()).toBe(true);

    // teardown
    await deleteDoc(docRef);
  });
});
