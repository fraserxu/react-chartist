import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/index.ts"],
  external: ["chartist", "react"],
  format: ["esm", "cjs"],
  sourcemap: true,
  splitting: false,
  target: "es2022",
  treeshake: false,
  esbuildOptions(options) {
    options.banner = { js: '"use client";' };
  },
});
