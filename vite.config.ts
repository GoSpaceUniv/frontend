/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
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
    },
    // 환경 변수를 클라이언트에 노출
    define: {
      'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || 'http://localhost:8080'),
      'process.env.NODE_ENV': JSON.stringify(mode)
    }
  };
});