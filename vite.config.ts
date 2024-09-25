import fs from "fs";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import type { HttpProxy } from "vite";
import { defineConfig } from "vite";

import { id } from "./public/module.json";

// original guide to using Vite for Foundry from the Lancer devs:
// https://foundryvtt.wiki/en/development/guides/vite

// config
let foundryUrl = "http://localhost:30000";
const foundryFolder = "modules";
const port = 40000;

// if foundryconfig.json exists, use that as the foundryUrl
if (fs.existsSync("./foundryconfig.json")) {
  foundryUrl = JSON.parse(
    fs.readFileSync("./foundryconfig.json").toString()
  ).url;
} else {
  console.log("No foundryconfig.json found, we're probably in CI");
}

const devServerUrl = `http://localhost:${port}`;
const headTag = "<head>";
const rootUri = `/${foundryFolder}/${id}`;
const viteClientScriptURL = `${devServerUrl}${rootUri}/@vite/client`;
const viteClientScript = `<script type="module" src="${viteClientScriptURL}"></script>`;

const config = defineConfig(({ mode }) => {
  console.log(mode);
  return {
    root: "src/",
    base: rootUri,
    publicDir: path.resolve(__dirname, "public"),

    server: {
      port,
      open: devServerUrl,
      proxy: {
        // In dev mode, we need to insert the vite client script into the head
        // of the index.html.
        "/game": {
          // see https://github.com/http-party/node-http-proxy#modify-response
          selfHandleResponse: true,
          target: foundryUrl,
          configure: (proxy: HttpProxy.Server) => {
            proxy.on("proxyRes", function (proxyRes, req, res) {
              const body: Uint8Array[] = [];
              proxyRes.on("data", function (chunk) {
                body.push(chunk);
              });
              proxyRes.on("end", function () {
                const html = Buffer.concat(body).toString();
                // this is the most future-proof way to get the preamble code.
                const fixedHtml = html.replace(
                  headTag,
                  `${headTag}${viteClientScript}`
                );
                res.statusCode = proxyRes.statusCode ?? 200;
                // copy the headers from the proxy response to the real response
                for (const [name, value] of Object.entries(proxyRes.headers)) {
                  if (value === undefined) continue;
                  // because we're monkeying with the content length, we need to
                  // update it to match the new length
                  const newValue =
                    name.toLowerCase() === "content-length"
                      ? fixedHtml.length
                      : value;
                  res.setHeader(name, newValue);
                }
                res.end(fixedHtml);
              });
            });
          },
        },
        [`^(?!${rootUri})`]: {
          target: foundryUrl,
        },
        "/socket.io": {
          target: foundryUrl.replace(/^https?/, "ws"),
          ws: true,
        },
      },
    },

    // vite's correct way to get env vars is through import.meta.env. however lots
    // of code relies on process.env, so we'll just fake that in here.
    // https://vitejs.dev/guide/env-and-mode.html
    // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env["NODE_ENV"]),
    },

    // see https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    // see also https://github.com/vitejs/vite/pull/8674 (this PR should have
    // fixed it, but maybe it's not in the version we're using?)
    // discussion: https://github.com/vitejs/vite/discussions/8640?sort=old
    esbuild: {
      logOverride: { "this-is-undefined-in-esm": "silent" },
    },

    build: {
      outDir: path.resolve(__dirname, "build"),
      emptyOutDir: true,
      sourcemap: mode !== "production",
      minify: mode === "production",
      // by default vite will generate "style.css". For Foundry, we want to have
      // the name of the system in the filename.
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") {
              return `${id}.css`;
            }
            return assetInfo.name ?? "";
          },
        },
      },
      lib: {
        name: id,
        entry: `${id}.ts`,
        formats: ["es"],
        fileName: id,
      },
    },

    plugins: [
      visualizer({
        gzipSize: true,
        template: "treemap",
        filename: "stats/treemap.html",
      }),
    ],
  };
});

export default config;
