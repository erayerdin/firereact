// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { renderHook } from "@testing-library/react";
import { useCallFunction } from ".";
import { functions } from "../firebase";

// refer to functions/index.js
const name = "sampleFunction" as const;
const returnVal = "sample function call responded" as const;

describe("the state of useCallFunction", () => {
  it("should be ready initially", async () => {
    const { result } = renderHook(() => useCallFunction(functions, { name }));
    const { state } = result.current;
    expect(state).toBe("ready");
  });

  it("should be done when finished", async () => {
    const { result } = renderHook(() => useCallFunction(functions, { name }));
    const { invoke } = result.current;
    await invoke();
    const { state } = result.current;
    expect(state).toBe("done");
  });
});

describe("the return of invoke", () => {
  it("should return the value", async () => {
    const { result } = renderHook(() => useCallFunction(functions, { name }));
    const { invoke } = result.current;
    const callResult = await invoke();
    expect(callResult.data).toBe(returnVal);
  });
});
