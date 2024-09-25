module.exports = {
  extends: ["./packages/shared-fvtt-bits/dotfiles/.eslintrc.cjs"],
  ignorePatterns: ["src/trail-of-cthulhu-2e.js"],
  // whatever other config you need for your project
  rules: {
    // All these no-unsafe-* rules are turned off because we have so many
    // situations we're interacting with FVTT or something else third party and
    // we just have to be honest and type stuff as `any`.
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        // there are many situations where we have a callback or handler
        // function which is async for the convenience of `await` but the call
        // site is expecting a () => void. This is fine.
        checksVoidReturn: false,
      },
    ],
  },
};
