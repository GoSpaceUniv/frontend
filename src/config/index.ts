const env = (typeof import.meta !== 'undefined' ? (import.meta as any).env : {}) as Record<string, string | undefined>;

export const CONFIG = {
  apiBaseUrl:
    env.EXPO_PUBLIC_API_BASE_URL ||
    env.VITE_API_BASE_URL ||
    env.API_BASE_URL ||
    'http://localhost:8080',
};
