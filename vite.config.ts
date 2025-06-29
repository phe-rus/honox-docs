import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: ["./app/client.ts", "./app/style.css"],
          output: {
            entryFileNames: "static/client.js",
            chunkFileNames: "static/assets/[name]-[hash].js",
            assetFileNames: "static/assets/[name].[ext]",
          },
        },
        emptyOutDir: false,
      },
      plugins: [tailwindcss()],
    };
  } else {
    return {
      ssr: {
        external: ['react', 'react-dom', '@tabler/icons-react'], // Externalize problematic dependencies
        noExternal: [/^@hono\//, 'gray-matter'] // Ensure HonoX modules and gray-matter are bundled
      },
      optimizeDeps: {
        exclude: ["@tabler/icons-react", '@radix-ui/react-slot'], // Exclude from pre-bundling
        include: ["react", "react-dom"], // Ensure React is optimized
      },
      plugins: [
        honox({
          devServer: { adapter },
          client: { input: ["./app/globals.css"] },
        }),
        tailwindcss(),
        build(),
      ],
    };
  }
});
