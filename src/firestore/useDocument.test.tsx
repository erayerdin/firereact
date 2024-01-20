// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, renderHook, screen } from "@testing-library/react";

const useSampleHook = () => {
  return "foo";
};

test("2 + 2 equals to 4", () => {
  expect(2 + 2).toBe(4);
});

test("div exists", async () => {
  render(<div>foo</div>);
  await screen.findByText(/foo/i);
});

test("useSampleHook", () => {
  const { result } = renderHook(() => useSampleHook());
  expect(result.current).toBe("foo");
});
