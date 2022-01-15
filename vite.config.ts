import { fileURLToPath, URL } from 'url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  publicDir: resolve(__dirname, 'client', 'public'),
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      // @ts-ignore
      '@': fileURLToPath(new URL('client', import.meta.url)),
    },
  },
});
