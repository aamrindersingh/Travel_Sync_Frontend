// client
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Avatar from '../shared/Avatar.client';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // TODO: integrate with useAuth hook for real user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined
  };

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

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors duration-300 focus-neon"
        aria-label="Open user menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar 
          src={user.avatar} 
          name={user.name} 
          size="md"
          className="ring-2 ring-transparent hover:ring-[var(--neon-accent)] transition-all duration-300"
        />
        <span className="hidden md:block text-white/80 text-sm font-medium">
          {user.name}
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl frosted-card border border-white/10 shadow-2xl z-50">
          <div className="py-2">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-sm text-white/60">{user.email}</p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/profile"
                className="flex items-center px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </Link>
              
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
              
              <Link
                href="/settings"
                className="flex items-center px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-white/10 pt-2">
              <button
                className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200"
                onClick={() => {
                  // TODO: implement logout logic
                  setIsOpen(false);
                }}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
