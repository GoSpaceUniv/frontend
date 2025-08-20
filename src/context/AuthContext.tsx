import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { StorageManager } from '../utils/storage';
import type { UserProfile } from '../types';
import { apiFetch } from '../api/client';

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isLoading: boolean;
}

interface SignInPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  emailOrPhone: string;
  password: string;
  displayName: string;
  graduationYear?: number;
  role?: UserProfile['role'];
}

interface AuthContextValue extends AuthState {
  signIn: (payload: SignInPayload) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  signOut: () => Promise<void>;
  isHighSchooler: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getIsHighSchooler(graduationYear?: number): boolean {
  if (!graduationYear) return false;
  const now = new Date();
  const currentYear = now.getFullYear();
  // 고등학교 졸업 예정(최대 +3년)까지 허용
  return graduationYear >= currentYear && graduationYear <= currentYear + 3;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ token: null, user: null, isLoading: true });

  useEffect(() => {
    // 앱 시작 시 저장된 인증 정보 로드
    const loadAuthData = async () => {
      try {
        const storedToken = await StorageManager.getItem<string>('authToken');
        const storedUser = await StorageManager.getItem<UserProfile>('authUser');
        if (storedToken && storedUser) {
          setState({ token: storedToken, user: storedUser, isLoading: false });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Failed to load auth data from storage', error);
        // JSON.parse 오류 발생 시 해당 키를 제거하여 다음 로드 시도 시 문제 방지
        if (error instanceof SyntaxError) {
          await StorageManager.removeItem('authToken');
          await StorageManager.removeItem('authUser');
          console.warn('Corrupted auth data removed from storage.');
        }
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };
    loadAuthData();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInPayload) => {
    try {
      const response = await apiFetch('/api/users/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const { id, email: userEmail, nickname, role } = response; // 응답에서 userId 및 사용자 정보 추출 (email은 userEmail로 변경)

      if (!id || !email || !nickname || !role) {
        throw new Error('API 응답에 필수 사용자 정보가 없습니다.');
      }

      const userProfile: UserProfile = {
        id: String(id), // id가 숫자일 수 있으므로 String으로 변환
        email: userEmail,
        displayName: nickname,
        role: role,
        // 기타 필드는 백엔드 응답에 따라 추가
        createdAt: new Date().toISOString(), // 임시 값
      };

      // userId를 authToken으로 저장 (실제로는 토큰이 아님)
      await StorageManager.setItem('authToken', String(id));
      await StorageManager.setItem('authUser', userProfile);
      setState({ token: String(id), user: userProfile, isLoading: false });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const signUp = useCallback(async ({ emailOrPhone, password, displayName, graduationYear, role }: SignUpPayload) => {
    // TODO: 백엔드 연동 - 회원가입 후 토큰 발급
    const demoToken = 'demo-jwt-token';
    const demoUser: UserProfile = {
      id: 'u_demo',
      email: emailOrPhone.includes('@') ? emailOrPhone : undefined,
      phone: emailOrPhone.includes('@') ? undefined : emailOrPhone,
      displayName,
      role: role ?? 'student',
      graduationYear,
      createdAt: new Date().toISOString(),
    };
    await StorageManager.setItem('authToken', demoToken);
    await StorageManager.setItem('authUser', demoUser);
    setState({ token: demoToken, user: demoUser, isLoading: false });
  }, []);

  const signOut = useCallback(async () => {
    await StorageManager.removeItem('authToken');
    await StorageManager.removeItem('authUser');
    setState({ token: null, user: null, isLoading: false });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    ...state,
    signIn,
    signUp,
    signOut,
    isHighSchooler: getIsHighSchooler(state.user?.graduationYear),
  }), [state, signIn, signUp, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
