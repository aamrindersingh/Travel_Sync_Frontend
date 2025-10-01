// client
'use client';

import { useMemo } from 'react';
import useAuth from '@/hooks/useAuth.client';

export default function ProfileDropdown() {
  const { user, isLoading, isAuthenticated, loginWithGoogle } = useAuth();

  const initials = useMemo(() => {
    if (user?.name) {
      const chars = user.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
      if (chars) return chars;
    }
    if (user?.email && user.email.length > 0) {
      return user.email[0].toUpperCase();
    }
    return '';
  }, [user]);

  if (isLoading) {
    return <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />;
  }

  if (!isAuthenticated) {
    return (
      <button
        onClick={loginWithGoogle}
        className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-black/70 border border-white/10 hover:border-[var(--neon-accent)]/40 hover:shadow-[0_0_20px_rgba(0,228,255,0.25)] transition-all duration-200 focus-visible:outline-none"
        aria-label="Login with Google"
      >
        Login with Google
      </button>
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold select-none">
      {initials || 'U'}
    </div>
  );
}
