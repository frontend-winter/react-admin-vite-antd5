import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
// https://vitejs.dev/config/

export default defineConfig(config => {
  console.log(config, "config");
  return {
    plugins: [legacy(), react()],
    resolve: {
      alias: {
        // for TypeScript path alias import like : @/x/y/z
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      open: true,
      port: 5793,
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          secure: false,
          rewrite: path => path.replace(/^\/api/, ""),
        },
      },
    },
    base: config.mode === "development" ? "/" : "/react-admin-vite-antd5/",
    build: {
      outDir: "react-admin-vite-antd5",
    },
  };
});
