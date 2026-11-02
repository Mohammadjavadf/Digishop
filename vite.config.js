import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seoFiles from "vite-plugin-seo-files";

export default defineConfig({
  base: '/Digishop/',
  plugins: [
    react(),
    seoFiles({
      generateSitemap: true,
      generateRobots: true,
      additionalUrls: [
        "/",
        "/products",
        "/about",
        "/contact",
        "/cart",
        "/wishlist",
        "/auth",
      ],
    }),
  ],
});