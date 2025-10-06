import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

export default [
  {
    root: true,

    languageOptions: {
      globals: {
        ...js.environments.browser.globals,
        ...js.environments.jest.globals,
      },
      parser: tseslint.parser,
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      storybook: storybookPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs["eslint-recommended"].rules,
      ...prettierPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...storybookPlugin.configs.recommended.rules,

      // Custom overrides
      "react/react-in-jsx-scope": "off",
    },
  },
];
