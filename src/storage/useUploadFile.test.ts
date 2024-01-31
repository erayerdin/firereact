// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { useUploadFile } from ".";

it("useUploadFile hook should initially have ready state", async () => {
  const { result } = renderHook(() => useUploadFile());
  const { state } = result.current;
  expect(state).toBe("ready");
});
