import typescript from "rollup-plugin-ts";
import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";

export default [
  {
    input: "src/scripts/popup.ts",
    output: [
      {
        dir: "./dist/scripts",
        format: "cjs",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
        types: ["chrome"],
      }),
      copy({
        targets: [
          { src: "src/**.html", dest: "dist" },
          { src: "src/assets/*", dest: "dist/assets" },
          { src: "src/manifest.json", dest: "dist" },
        ],
      }),
      terser(),
    ],
  },
  {
    input: "src/scripts/content.ts",
    output: [
      {
        dir: "./dist/scripts",
        format: "cjs",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
        types: ["chrome"],
      }),
      ,
      terser(),
    ],
  },
];
