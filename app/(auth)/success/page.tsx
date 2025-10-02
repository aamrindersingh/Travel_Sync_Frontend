'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext.client';

function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const isFirstLogin = useMemo(() => {
    const fromQuery = searchParams?.get('new') === '1';
    let fromCookie = false;
    if (typeof document !== 'undefined') {
      fromCookie = document.cookie.split('; ').some((c) => c.startsWith('first_login=1'));
    }
    return !!(fromQuery || fromCookie);
  }, [searchParams]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return; // wait for auth

    if (isFirstLogin) {
      setShowOnboarding(true);
    } else {
      router.replace('/home');
    }
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

        {isAuthenticated && showOnboarding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowOnboarding(false)}></div>
            <div className="relative z-10 w-full max-w-lg mx-auto p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--neon-accent)]/10 via-transparent to-[var(--neon-accent-2)]/10 rounded-3xl blur-xl opacity-40"></div>
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-1">Complete your profile</h3>
                <p className="text-sm text-white/70 mb-6">Just a couple of details to get started</p>

                <div className="space-y-5">
                  <div className="group">
                    <label htmlFor="onb-name" className="block text-sm font-semibold text-white mb-2 flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2 animate-pulse"></span>
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        id="onb-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 hover:bg-white/8 group-hover:border-white/20 focus:shadow-[0_0_20px_rgba(0,228,255,0.3)]"
                        placeholder="e.g. Alex"
                        required
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="onb-whatsapp" className="block text-sm font-semibold text-white mb-2 flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2 animate-pulse"></span>
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <input
                        id="onb-whatsapp"
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full px-4 py-3 pl-12 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:bg-green-500/15 group-hover:border-green-400/50 focus:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                        placeholder="Your WhatsApp number"
                        required
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3 justify-end">
                  <button
                    onClick={() => setShowOnboarding(false)}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-gray-200 bg-white/10 border border-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--neon-accent)]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // TODO: POST profile to backend when endpoint is available
                      if (typeof document !== 'undefined') {
                        document.cookie = 'first_login=; Max-Age=0; Path=/';
                      }
                      router.replace('/home');
                    }}
                    className="inline-flex items-center px-6 py-2 rounded-2xl font-bold text-white transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, var(--neon-accent) 0%, var(--neon-accent-2) 100%)',
                      boxShadow: '0 8px 32px rgba(0, 228, 255, 0.4), 0 0 0 1px rgba(0, 228, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    Save & Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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


