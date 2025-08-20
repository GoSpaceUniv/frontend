/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
});