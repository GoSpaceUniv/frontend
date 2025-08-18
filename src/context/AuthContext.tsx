import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { StorageManager } from '../utils/storage';
import type { UserProfile } from '../types';

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isLoading: boolean;
}

interface SignInPayload {
  emailOrPhone: string;
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
    (async () => {
      const [token, user] = await Promise.all([
        StorageManager.getItem<string>('authToken'),
        StorageManager.getItem<UserProfile>('authUser'),
      ]);
      setState({ token: token ?? null, user: user ?? null, isLoading: false });
    })();
  }, []);

  const signIn = useCallback(async ({ emailOrPhone, password }: SignInPayload) => {
    // TODO: 백엔드 연동 - 이메일/휴대폰과 비밀번호로 로그인 요청, 응답으로 JWT 토큰 수신
    // 데모: 임시 토큰과 유저 저장
    const demoToken = 'demo-jwt-token';
    const demoUser: UserProfile = {
      id: 'u_demo',
      email: emailOrPhone.includes('@') ? emailOrPhone : undefined,
      phone: emailOrPhone.includes('@') ? undefined : emailOrPhone,
      displayName: '사용자',
      role: 'student',
      graduationYear: new Date().getFullYear() + 1,
      createdAt: new Date().toISOString(),
    };
    await StorageManager.setItem('authToken', demoToken);
    await StorageManager.setItem('authUser', demoUser);
    setState({ token: demoToken, user: demoUser, isLoading: false });
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
