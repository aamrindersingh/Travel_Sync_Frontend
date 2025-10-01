// client
'use client';

import { useState, useEffect, useCallback } from 'react';
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
}

export default function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const fetchUser = useCallback(async () => {
    try {
      const me = await api.getMe();
      if (me && me.email && me.email.endsWith('@sst.scaler.com')) {
        setAuthState({ user: me, isLoading: false, isAuthenticated: true });
      } else {
        setAuthState({ user: null, isLoading: false, isAuthenticated: false });
      }
    } catch {
      setAuthState({ user: null, isLoading: false, isAuthenticated: false });
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

  return {
    ...authState,
    loginWithGoogle,
    logout,
    refetch: fetchUser,
  };
}
