'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import UserBuddies, { BuddyCardProps } from '@/components/ui/UserBuddies.client';

interface RecommendationsProps {
  ticketId: string;
}

export default function Recommendations({ ticketId }: RecommendationsProps) {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<'pre' | 'fetching' | 'done'>('pre');
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    best_match?: { ticket: any; score: number; date: string; time: string } | null;
    best_group?: Array<{ ticket: any; score: number; date: string; time: string }> | null;
    other_alternatives?: any[] | null;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    setPhase('fetching');

    // Small delay to show animation text
    const timer = setTimeout(() => {
      api.getRecommendations(ticketId)
        .then((res) => {
          if (!mounted) return;
          const payload = res?.data ?? res;
          setData(payload);
        })
        .catch((err) => {
          if (!mounted) return;
          setError(err?.response?.data?.error || 'Failed to load recommendations');
        })
        .finally(() => {
          if (!mounted) return;
          setLoading(false);
          setPhase('done');
        });
    }, 900);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [ticketId]);

  const bestMatch = data?.best_match || null;
  const bestGroup = data?.best_group || [];
  const alternatives = data?.other_alternatives || [];

  const toBuddy = (t: any, score?: number, date?: string, time?: string): BuddyCardProps => {
    // We don't have user name/batch data in ticket response; placeholder name.
    const name = t?.student_name || 'Traveler';
    const batch = t?.student_batch ? `Batch ${t.student_batch}` : 'Student';
    return {
      id: String(t?.id || t?.ticket?.id || Math.random()),
      name,
      batch,
      time: time || '—',
      source: t?.source || t?.ticket?.source || '—',
      destination: t?.destination || t?.ticket?.destination || '—',
      phone_number: t?.phone_number || t?.ticket?.phone_number,
    };
  };

  if (loading || phase !== 'done') {
    return (
      <div className="frosted-card">
        <div className="flex items-center space-x-3 mb-4">
          <svg className="w-5 h-5 animate-spin text-[var(--neon-accent)]" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
          <span className="text-white/80">Fetching users for you...</span>
        </div>
        <div className="text-white/50 text-sm">Finding best matches and groups near your time window</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="frosted-card">
        <p className="text-rose-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Best Match */}
      <div className="frosted-card">
        <div className="flex items-center space-x-3 mb-6">
          <svg className="w-6 h-6 text-[var(--neon-accent)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <div>
            <h3 className="text-2xl font-bold text-white">Best Match</h3>
            <p className="text-white/70 text-sm">Individual travelers with the highest compatibility score</p>
          </div>
        </div>
        {bestMatch ? (
          <UserBuddies buddies={[toBuddy(bestMatch.ticket, bestMatch.score, bestMatch.date, bestMatch.time)]} />
        ) : (
          <div className="text-white/60">No best match yet</div>
        )}
      </div>

      {/* Best Group */}
      <div className="frosted-card">
        <div className="flex items-center space-x-3 mb-6">
          <svg className="w-6 h-6 text-[var(--neon-accent-2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div>
            <h3 className="text-2xl font-bold text-white">Best Group</h3>
            <p className="text-white/70 text-sm">Groups of travelers that match your preferences</p>
          </div>
        </div>
        {bestGroup && bestGroup.length > 0 ? (
          <UserBuddies buddies={bestGroup.map((m) => toBuddy(m.ticket, m.score, m.date, m.time))} />
        ) : (
          <div className="text-white/60">No group matches yet</div>
        )}
      </div>

      {/* Alternatives */}
      <div className="frosted-card">
        <div className="flex items-center space-x-3 mb-6">
          <svg className="w-6 h-6 text-[var(--neon-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div>
            <h3 className="text-2xl font-bold text-white">Other Alternatives</h3>
            <p className="text-white/70 text-sm">Other potential matches and opportunities</p>
          </div>
        </div>
        {alternatives && alternatives.length > 0 ? (
          <UserBuddies buddies={alternatives.map((alt: any) => toBuddy(alt.ticket || alt))} />
        ) : (
          <div className="text-white/60">No alternatives at the moment</div>
        )}
      </div>
    </div>
  );
}


