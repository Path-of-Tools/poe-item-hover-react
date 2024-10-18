import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // Path to your main TypeScript file
      name: "PoeItemHover",
      fileName: (format) => `poe-item-hover.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        // Ensure relative imports of CSS are handled
        url: true,
      },
    },
  },
  plugins: [dts()],
});
