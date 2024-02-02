// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { useDownloadBlob } from ".";

it("initially, useDownloadBlob hook should have ready state", async () => {
  const { result } = renderHook(() => useDownloadBlob());
  const { state } = result.current;
  expect(state).toBe("ready");
});
