'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth.client';

function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();

  const isFirstLogin = useMemo(() => searchParams?.get('new') === '1', [searchParams]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return;
    router.replace(isFirstLogin ? '/home?new=1' : '/home');
  }, [isLoading, isAuthenticated, isFirstLogin, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="relative w-full max-w-lg p-8 text-center">
        <div className="absolute -inset-10 bg-gradient-to-r from-[var(--neon-accent)]/10 via-transparent to-[var(--neon-accent-2)]/10 rounded-3xl blur-2xl opacity-50"></div>
        <div className="relative">
          <div className="mx-auto w-16 h-16 rounded-full bg-[var(--neon-accent)]/20 border border-[var(--neon-accent)]/40 flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-[var(--neon-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-white">Signing you in…</h2>
          <p className="mt-2 text-white/70">Preparing your TravelSync experience</p>
        </div>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]"><div className="text-white/70">Loading…</div></div>}>
      <Content />
    </Suspense>
  );
}


