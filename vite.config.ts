import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTest.js",
    coverage: {
      enabled: true,
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "coverage",
      reportOnFailure: true,
      exclude: ["**/*.stories.jsx"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
