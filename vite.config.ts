import { createFvttViteConfig } from "./packages/shared-fvtt-bits/dotfiles/import/createFvttViteConfig";
import { id as foundryPackageId } from "./public/module.json";

const config = createFvttViteConfig({
  foundryPackageId,
  packageType: "module",
  importMetaUrl: import.meta.url,
  // no React/JSX in this module, so skip the React SWC + emotion plugins
  includeReact: false,
});

export default config;
