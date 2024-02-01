// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { getDownloadURL, ref } from "firebase/storage";
import * as fs from "fs";
import { useUploadFile } from ".";
import { storage } from "../firebase";

const reference = ref(storage, "files/README.md");

describe("initially, useUploadFile hook", () => {
  it("should have ready state", async () => {
    const { result } = renderHook(() => useUploadFile({ reference }));
    const { state } = result.current;
    expect(state).toBe("ready");
  });
});

describe("useUploadFile hook", () => {
  it("should upload file", async () => {
    const { result } = renderHook(() => useUploadFile({ reference }));
    const { dispatch } = result.current;
    const file = fs.readFileSync("README.md");
    await dispatch(file);

    const url = await getDownloadURL(reference);
    const res = await fetch(url);
    expect(res.ok).toBe(true);
  });
});
