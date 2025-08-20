// 환경 변수 타입 정의
interface EnvironmentConfig {
  apiBaseUrl: string;
  environment: string;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
}

// 환경 변수 가져오기 (Vite와 일반 Node.js 환경 모두 지원)
const getEnvVar = (key: string, fallback: string = ''): string => {
  // Vite 환경에서 import.meta.env 사용
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return ((import.meta as any).env as any)[key] || fallback;
  }
  
  // Node.js 환경에서 process.env 사용
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || fallback;
  }
  
  return fallback;
};

// 환경 감지
const getEnvironment = (): string => {
  return getEnvVar('NODE_ENV', 'development');
};

// API 기본 URL 결정 (우선순위: 환경별 설정 > 기본값)
const getApiBaseUrl = (): string => {
  const env = getEnvironment();
  
  // 환경별 기본 URL
  const envUrls = {
    development: 'http://localhost:8080',
    production: 'https://api.gosisaengdan.com', // 프로덕션 URL 예시
    test: 'http://localhost:8080'
  };
  
  // 명시적으로 설정된 환경 변수가 있으면 사용
  const explicitUrl = getEnvVar('VITE_API_BASE_URL') || 
                     getEnvVar('EXPO_PUBLIC_API_BASE_URL') || 
                     getEnvVar('API_BASE_URL');
  
  if (explicitUrl) {
    return explicitUrl;
  }
  
  // 환경별 기본값 사용
  return envUrls[env as keyof typeof envUrls] || envUrls.development;
};

export const CONFIG: EnvironmentConfig = {
  apiBaseUrl: getApiBaseUrl(),
  environment: getEnvironment(),
  isDevelopment: getEnvironment() === 'development',
  isProduction: getEnvironment() === 'production',
  isTest: getEnvironment() === 'test'
};

// 개발 환경에서 설정 로그 출력
if (CONFIG.isDevelopment) {
  console.log('🔧 환경 설정:', {
    apiBaseUrl: CONFIG.apiBaseUrl,
    environment: CONFIG.environment,
    isDevelopment: CONFIG.isDevelopment,
    isProduction: CONFIG.isProduction,
    isTest: CONFIG.isTest
  });
}
