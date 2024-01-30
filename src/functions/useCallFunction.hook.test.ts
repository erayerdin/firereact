// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { useCallFunction } from ".";
import { functions } from "../firebase";

const name = "sampleFunction" as const;

describe("the state of useCallFunction", () => {
  it("should be ready initially", async () => {
    const { result } = renderHook(() => useCallFunction({ functions, name }));
    const { state } = result.current;
    expect(state).toBe("ready");
  });

  it("should be done when finished", async () => {
    const { result } = renderHook(() => useCallFunction({ functions, name }));
    const { invoke } = result.current;
    await invoke();
    const { state } = result.current;
    expect(state).toBe("done");
  });
});
