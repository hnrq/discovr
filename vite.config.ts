import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import solidSvg from 'vite-plugin-solid-svg';

export default defineConfig({
  plugins: [solidPlugin(), tsconfigPaths(), solidSvg()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
