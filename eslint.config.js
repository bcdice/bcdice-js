const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
  ...compat.config({
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "eslint-plugin-tsdoc", "import"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "prettier",
    ],
    rules: {
      quotes: ["error", "single"],
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "import/no-unresolved": [
        "error",
        {
          ignore: ["^..$", "^../../lib"],
        },
      ],
      "import/order": "error",
      "tsdoc/syntax": "error",
    },
    overrides: [
      {
        files: "**/*.test.*",
        env: {
          jest: true,
        },
      },
      {
        files: "lib/**/*.js",
        parser: "espree",
        parserOptions: {
          sourceType: "script",
          ecmaVersion: 2021,
          impliedStrict: true,
        },
        extends: [
          "eslint:recommended",
          "plugin:import/errors",
          "plugin:import/warnings",
          "prettier",
        ],
        env: {
          es2021: true,
          browser: true,
          node: true,
        },
        globals: {
          Opal: "readonly",
        },
        rules: {
          "@typescript-eslint/no-empty-function": "off",
          "@typescript-eslint/no-this-alias": "off",
          "@typescript-eslint/no-unused-vars": "off",
          "@typescript-eslint/no-var-requires": "off",
          "no-cond-assign": "off",
          "no-constant-condition": "off",
          "no-control-regex": "off",
          "no-empty": "off",
          "no-fallthrough": "off",
          "no-prototype-builtins": "off",
          "no-redeclare": "off",
          "no-regex-spaces": "off",
          "no-unreachable": "off",
          "no-unused-vars": "off",
          "no-useless-escape": "off",
          "tsdoc/syntax": "off",
          "no-undef": "error",
          "no-undef-init": "error",
        },
      },
    ],
  }),
];
