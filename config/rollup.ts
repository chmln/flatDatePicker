import typescript from "rollup-plugin-typescript";

import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { resolve } from "path";
import * as pkg from "../package.json";
import { RollupOptions } from "rollup";

export const getConfig = (opts?: { dev: boolean, launchBrowser: boolean }): RollupOptions => ({
  input: "./src/index.ts",
  output: {
    file: "dist/flatpickr.js",
    name: "flatpickr",
    format: "umd",
    exports: "default",
    banner: `/* flatpickr v${pkg.version}, @license MIT */`,
    sourcemap: (opts != undefined ? opts.dev : false),
  },
  experimentalOptimizeChunks: true,
  onwarn(warning) {
    const ignoredCircular = ["src/types/options.ts", "src/utils/dates.ts"];

    if (typeof warning === "string") throw Error(warning);
    else if (
      warning.code !== "CIRCULAR_DEPENDENCY" ||
      !warning.importer ||
      !ignoredCircular.includes(warning.importer!)
    ) {
      throw Error(warning.message);
    }
  },

  plugins: [
    typescript({ tsconfig: resolve("./src/tsconfig.json", __dirname) }),
    babel({ runtimeHelpers: true }),
    ...(opts && opts.dev
      ? [
          serve({
            open: opts && opts.launchBrowser,
            contentBase: "",
            host: "127.0.0.1",
            port: 8000,
          }),
          livereload(),
        ]
      : []),
  ],
  watch: {
    chokidar: false,
  },
});

export default getConfig();
