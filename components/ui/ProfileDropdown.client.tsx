// client
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Avatar from '../shared/Avatar.client';
import useAuth from '@/hooks/useAuth.client';

export default function ProfileDropdown() {
  const { user, isLoading, isAuthenticated, loginWithGoogle } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  if (!isLoading && !isAuthenticated) {
    return (
      <button
        onClick={loginWithGoogle}
        className="relative inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-black/70 border border-white/10 hover:border-sky-400/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all duration-200 focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute -inset-0.5 rounded-xl" style={{ background: 'linear-gradient(120deg, rgba(37,99,235,0.25), rgba(37,99,235,0))', filter: 'blur(8px)', opacity: 0.2 }} />
        <span className="relative">Login with Google</span>
      </button>
    );
  }

  if (isLoading) {
    return <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors duration-300"
        aria-label="Open user menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar 
          src={user?.avatar} 
          name={initials || user?.name || ''} 
          size="md"
          className="ring-2 ring-transparent hover:ring-[var(--neon-accent)] transition-all duration-300"
        />
        <span className="hidden md:block text-white/80 text-sm font-medium">
          {user?.name}
        </span>
        <svg 
          className={`w-4 h-4 text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl frosted-card border border-white/10 shadow-2xl z-50">
          <div className="py-2">
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-sm text-white/60">{user?.email}</p>
            </div>
            <div className="py-2">
              <Link
                href="/tickets"
                className="flex items-center px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                My Tickets
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
