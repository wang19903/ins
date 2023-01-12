import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      //端口一致避免跨域
      "/api": "http://localhost:1337",
      "/upload": "http://localhost:1337" //strapi
    }
  }
});
