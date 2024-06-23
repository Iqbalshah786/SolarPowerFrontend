import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/sheetmetadata": "https://solarpower-backend-2f0d59f7581f.herokuapp.com",
      "api/sheetmetadata/ReadDataByCountries": "https://solarpower-backend-2f0d59f7581f.herokuapp.com",
    },
  },
  plugins: [react()],
});
