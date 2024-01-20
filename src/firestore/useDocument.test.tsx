// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";

test("2 + 2 equals to 4", () => {
  expect(2 + 2).toBe(4);
});

test("div exists", async () => {
  render(<div>foo</div>);
  await screen.findByText(/foo/i);
});
