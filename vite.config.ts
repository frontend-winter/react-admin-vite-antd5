import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
import vitePluginCompression from "vite-plugin-compression";

const baseUrl = "react-admin-vite-antd5";

export default defineConfig(config => {
  console.log(config, "config");
  return {
    plugins: [
      legacy(),
      react(),
      vitePluginCompression({
        threshold: 1024 * 10, // 对大于 10kb 的文件进行压缩
        // deleteOriginFile: true,
      }),
    ],
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
    base: config.mode === "development" ? "/" : `/${baseUrl}/`,
    build: {
      outDir: baseUrl,
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
          entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
          assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  };
});
