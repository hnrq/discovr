import { defineConfig, UserConfigExport } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [solidPlugin(), tsconfigPaths(), solidSvg()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ws.audioscrobbler.com/2.0',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    moduleNameMapper: {
      '\\.(svg)$': 'src/__mocks__/svgMock.ts',
    },
    setupFiles: ['setupTests.ts'],
    deps: {
      inline: [/solid-js/],
    },
  },
} as UserConfigExport);
