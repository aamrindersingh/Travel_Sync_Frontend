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
    router.push('/home');
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
        className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-black/70 border border-white/10 hover:border-[var(--neon-accent)]/40 hover:ring-1 hover:ring-[var(--neon-accent)]/40 hover:shadow-[0_0_28px_rgba(0,228,255,0.32)] transition-all duration-200 focus-visible:outline-none"
        aria-label="Login"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
          aria-hidden="true"
          shapeRendering="geometricPrecision"
          className="shrink-0 block"
        >
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.2 33.9 29 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.3l5.7-5.7C34.6 5.1 29.6 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21 21-9.3 21-21c0-1.2-.1-2.3-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.3 0 6.3 1.2 8.6 3.3l5.7-5.7C34.6 5.1 29.6 3 24 3 15.5 3 8.2 7.8 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 45c5.4 0 10.3-2.1 13.9-5.5l-6.4-5.2C29.1 35.8 26.7 37 24 37c-5 0-9.2-3.2-10.7-7.6l-6.6 5.1C8.5 41.2 15.7 45 24 45z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-4.5 6-8.3 6-2.3 0-4.5-.9-6.1-2.3l-6.6 5.1C16.7 43.2 20.1 45 24 45c9 0 16.5-6.1 18-14.5.3-1.2.4-2.3.4-3.5 0-1.2-.1-2.3-.4-3.5z"/>
        </svg>
        Login
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
