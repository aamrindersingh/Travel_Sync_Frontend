// client
'use client';

import { useState, useEffect, useCallback } from 'react';

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
    isAuthenticated: false
  });

  // TODO: Implement auth token reading from httpOnly cookie or client state
  const getAuthToken = useCallback(() => {
    // Check for token in httpOnly cookie (handled by server)
    // or in localStorage/sessionStorage for client-side auth
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }, []);

  // TODO: Implement user data fetching from API
  const fetchUser = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setAuthState(prev => ({ ...prev, isLoading: false, isAuthenticated: false }));
      return;
    }

    try {
      // TODO: Call API to get user data
      // const response = await api.getUser();
      // setAuthState({
      //   user: response.data,
      //   isLoading: false,
      //   isAuthenticated: true
      // });
      
      // Mock implementation
      setAuthState({
        user: {
          id: '1',
          email: 'user@example.com',
          name: 'John Doe'
        },
        isLoading: false,
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setAuthState(prev => ({ ...prev, isLoading: false, isAuthenticated: false }));
    }
  }, [getAuthToken]);

  // TODO: Implement login function
  const login = useCallback(async (_email: string, _password: string) => {
    try {
      // TODO: Call API to authenticate
      // const response = await api.login({ email, password });
      // localStorage.setItem('authToken', response.data.token);
      // await fetchUser();
      
      // Mock implementation
      localStorage.setItem('authToken', 'mock-token');
      await fetchUser();
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed' };
    }
  }, [fetchUser]);

  // TODO: Implement logout function
  const logout = useCallback(async () => {
    try {
      // TODO: Call API to logout
      // await api.logout();
      localStorage.removeItem('authToken');
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    ...authState,
    login,
    logout,
    refetch: fetchUser
  };
}
