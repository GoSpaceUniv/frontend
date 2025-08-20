import { CONFIG } from '../config';
import { StorageManager } from '../utils/storage';

export async function apiFetch(path: string, options: RequestInit = {}) {
  console.log(`apiFetch 호출: 경로 ${path}`);
  const token = await StorageManager.getItem<string>('authToken');
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = token; // userId를 직접 Authorization 헤더에 넣음

  console.log('요청 헤더:', headers);
  console.log('요청 바디:', options.body);
  console.log('요청 URL:', `${CONFIG.apiBaseUrl}${path}`);

  try {
    const res = await fetch(`${CONFIG.apiBaseUrl}${path}`, {
      ...options,
      headers,
    });

    console.log(`응답 상태: ${res.status}`);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('API 요청 실패 응답:', text);
      throw new Error(text || `Request failed: ${res.status}`);
    }
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const jsonResponse = await res.json();
      console.log('API 응답 (JSON):', jsonResponse);
      return jsonResponse;
    }
    const textResponse = await res.text();
    console.log('API 응답 (Text):', textResponse);
    return textResponse;
  } catch (error) {
    console.error('apiFetch 오류 발생:', error);
    throw error;
  }
}
