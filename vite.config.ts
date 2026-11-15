import { defineConfig } from "vite-plus";

export default defineConfig(({ mode }) => {
  return {
    fmt: {},
    lint: {
      jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
      rules: { "vite-plus/prefer-vite-plus-imports": "error" },
      options: { typeAware: true, typeCheck: true },
    },
    base: mode === "production" ? "/babylonlite-htmlincanvas-playground-vp/" : "",
  };
});
