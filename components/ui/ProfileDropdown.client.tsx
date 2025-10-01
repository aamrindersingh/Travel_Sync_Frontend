// client
'use client';

import { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth.client';

export default function ProfileDropdown() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, loginWithGoogle, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);
  const handleLogout = useCallback(async () => {
    await logout();
    router.push('/auth/login');
  }, [logout, router]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [close]);

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
    <div ref={rootRef} className="relative flex items-center">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold select-none ring-1 ring-white/10 hover:ring-[var(--neon-accent)]/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-accent)]/50"
      >
        {initials || 'U'}
      </button>
      {/* Slide-out pill inside header */}
      <div
        className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 z-40 transition-all duration-600 ease-out ${
          open ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-6 pointer-events-none'
        }`}
      >
        <div className="relative">
          <span className="absolute inset-0 -z-10 rounded-full bg-red-500/8 blur-[6px]" />
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-red-400 border border-red-400/40 bg-transparent hover:bg-red-500/10 active:bg-red-500/15 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/50"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
