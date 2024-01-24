// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";

it("sample component test", async () => {
  render(<div>foo</div>);

  expect(screen.getByText("foo").innerHTML).toBe("foo");
});
