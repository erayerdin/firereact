import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import globals from "globals";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
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
      "react/react-in-jsx-scope": "off",
    },
  },
];
