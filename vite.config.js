import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/sheetmetadata": "http://localhost:5000",
      "api/sheetmetadata/ReadDataByCountries": "http://localhost:5000",
    },
  },
  plugins: [react()],
});
