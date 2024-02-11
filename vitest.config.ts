// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom", // jsdom does not work for some reason
    exclude: [...configDefaults.exclude, "functions", "remotion", "dist"],
  },
});
