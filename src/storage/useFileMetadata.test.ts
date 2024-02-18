// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { ref } from "firebase/storage";
import { useFileMetadata } from ".";
import { storage } from "../firebase";

const reference = ref(storage, "files/README.md");

it("initially, useFileMetadata hook should have ready state", async () => {
  const { result } = renderHook(() => useFileMetadata(reference));
  const { state } = result.current;
  expect(state).toBe("ready");
});
