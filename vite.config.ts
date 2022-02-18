import { defineConfig } from "vite";
import ViteIcons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [ViteIcons({ autoInstall: true })],
});
