import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      email: path.resolve(__dirname, "./emails"),
      email_components: path.resolve(__dirname, "./emails_components"),
    },
  },
});
