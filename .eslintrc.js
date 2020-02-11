module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ["@typescript-eslint", "security"],
  extends: [
    "eslint:recommended",
    "plugin:security/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "security"],
  rules: {},
  ignorePatterns: ["dist"],
};
