import pkg from "./package.json";

export default [
  {
    input: "oddslib.mjs",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
