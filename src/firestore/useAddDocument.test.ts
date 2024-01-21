// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import useAddDocument from "./useAddDocument";

const colRef = collection(firestore, "profiles");
const docRef = doc(firestore, "profiles", "addDocumentProfile");
const docData = { displayName: "Add Document" };

describe("initially useAddDocument hook", () => {
  it("should return ready", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    const { result } = renderHook(() =>
      useAddDocument({ reference: colRef, data: docData }),
    );
    const { state } = result.current;
    expect(state).toBe("ready");

    // teardown
    await deleteDoc(docRef);
  });
});
