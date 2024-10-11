module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: true,
    // tsconfigRootDir: __dirname,
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "simple-import-sort",
    "unused-imports",
  ],
  rules: {
    //
    //core rules
    "comma-dangle": ["error", "always-multiline"],
    "dot-notation": "off",
    quotes: ["error", "double", { avoidEscape: true }],
    semi: ["error", "always"],
    "no-use-before-define": "off",
    "no-restricted-globals": [
      "error",
      {
        name: "logger",
        message:
          "This is a Foundry global which breaks tests.\n" +
          "Import `systemLogger` from `functions` instead.",
      },
    ],
    // replaced by ts version
    "no-useless-constructor": "off",
    // need to replace this with @typescript-eslint/no-restricted-imports so we
    // can allow type imports from lodash but this will require some eslint etc
    // version bumps
    // "no-restricted-imports": ["error", "lodash"],
    // typescript-eslint enforces using void to explicitely not await a promise
    "no-void": "off",

    //
    // TS

    // optional, but a nice bit of rigor
    "@typescript-eslint/no-use-before-define": ["error"],

    // unfortunately foundry create way too many situation where we need to talk
    // about any
    "@typescript-eslint/no-explicit-any": ["off"],

    // this would be a huge pain to enable because there's no auto-fix
    "@typescript-eslint/explicit-module-boundary-types": ["off"],

    // this would be enabled via extends: ['plugin:@typescript-eslint/stylistic'],
    "@typescript-eslint/no-empty-function": "error",

    // we need to use global namespaces for league types
    "@typescript-eslint/no-namespace": ["warn", { allowDeclarations: true }],

    // we also have noPropertyAccessFromIndexSignature: true in tsconfig which
    // effectively forces this on. See
    // https://typescript-eslint.io/rules/dot-notation#allowindexsignaturepropertyaccess
    "@typescript-eslint/dot-notation": [
      "error",
      { allowIndexSignaturePropertyAccess: true },
    ],

    // ts-aware version, allows `public` constructor parameters
    "@typescript-eslint/no-useless-constructor": "error",

    // I tried https://typescript-eslint.io/rules/no-unnecessary-condition/ but
    // it causes more problems than it solves - for example indexed access in TS
    // always returns the value type of the thing being access, but sometimes
    // you want to check for undefined. With that rule on, you either need to
    // * make the container's value type be whatever|undefined
    //   * then either check for that everywhere, whereas in fact it's only
    //    sometimes that you want the check)
    //   * or you litter `!` everywhere.
    // * or you put /*esling-ignore*/ everywhere.
    // either way, not nice.

    //
    // react

    // this isn't smart enough to to see the type param given to `React.FC<...>`
    "react/prop-types": ["off"],
    // if there's a better way to tell eslint about emotion's `css` props, I'd
    // love to know
    "react/no-unknown-property": ["error", { ignore: ["css"] }],

    //
    // simple-import-sort
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    //
    // auto-fixable version of no-unused imports
    // see https://github.com/sweepline/eslint-plugin-unused-imports
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        // we have many situations where we need to supply a function to a  Foundry
        // API and it feels more correct to able to declare the args we're getting
        // even if we don't use them all.
        args: "none",
        ignoreRestSiblings: true,
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": ["off"],
      },
    },
    {
      // vitest 1.x generates inline snapshots in backticks
      files: ["*.test.ts"],
      rules: {
        quotes: ["off", "double", { avoidEscape: true }],
      },
    },
  ],
  globals: {
    // Hooks: "readonly",
    CONFIG: "readonly",
    Actor: "readonly",
    ActorSheet: "readonly",
    Actors: "readonly",
    jQuery: "readonly",
    JQuery: "readonly",
    mergeObject: "readonly",
    Item: "readonly",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
