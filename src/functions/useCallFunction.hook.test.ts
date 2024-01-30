// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { useCallFunction } from ".";

describe("the state of useCallFunction", () => {
  it("should be ready initially", async () => {
    const { result } = renderHook(() => useCallFunction());
    const { state } = result.current;
    expect(state).toBe("ready");
  });
});
