// client
'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import api from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  profilePhone?: string | null;
}

interface AuthContextType extends AuthState {
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    profilePhone: null,
  });

  const fetchUser = useCallback(async () => {
    try {
      const me = await api.getMe();
      if (me && me.email) {
        let profilePhone: string | null = null;
        try {
          const details = await api.getUser(me.user_id || me.id);
          const raw =
            details?.data?.phone_number ||
            details?.phone_number ||
            details?.data?.PhoneNumber ||
            (details?.data && (details.data as Record<string, unknown>)['PhoneNumber']) ||
            ((details as unknown as Record<string, unknown>)['PhoneNumber'] as string | undefined);
          if (raw) {
            const digits = String(raw).replace(/\D/g, '');
            profilePhone = digits.length >= 10 ? digits.slice(-10) : digits;
          }
        } catch {}
        setAuthState({ user: me, isLoading: false, isAuthenticated: true, profilePhone });
      } else {
        setAuthState({ user: null, isLoading: false, isAuthenticated: false, profilePhone: null });
      }
    } catch {
      setAuthState({ user: null, isLoading: false, isAuthenticated: false, profilePhone: null });
    }
  }, []);

  const loginWithGoogle = useCallback(() => {
    api.beginGoogleLogin();
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setAuthState({ user: null, isLoading: false, isAuthenticated: false });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const value: AuthContextType = {
    ...authState,
    loginWithGoogle,
    logout,
    refetch: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
