'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import TravelCard from '@/components/ui/TravelCard.client';

type TicketLike = {
  id?: number | string;
  student_name?: string;
  user_name?: string;
  name?: string;
  student_batch?: string;
  user_batch?: string;
  batch?: string;
  email?: string;
  source?: string;
  destination?: string;
  whatsappLink?: string;
  departure_at?: string;
};

function bName(t: TicketLike | undefined | null): string {
  return t?.student_name || t?.user_name || t?.name || 'Traveler';
}

function getInitials(fullName?: string): string {
  const safe = String(fullName || '').trim();
  if (!safe) return 'T';
  return safe
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() || '')
    .join('') || 'T';
}

interface RecommendationsProps {
  ticketId: string;
}

export default function Recommendations({ ticketId }: RecommendationsProps) {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<'pre' | 'fetching' | 'done'>('pre');
  const [error, setError] = useState<string | null>(null);
  type RecUser = { name?: string; batch?: string; email?: string; whatsappLink?: string };
  const [data, setData] = useState<{
    best_match?: { ticket: TicketLike; user?: RecUser; score: number; date: string; time: string } | null;
    best_group?: Array<{ ticket: TicketLike; user?: RecUser; score: number; date: string; time: string }> | null;
    other_alternatives?: Array<{ ticket?: TicketLike; user?: RecUser; score?: number; date?: string; time?: string }> | null;
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
          // API returns { success, data: { ... } }
          console.log('[recommendations] raw response:', res);
          const payload = res?.data ?? res;
          console.log('[recommendations] parsed payload:', payload);
          console.log('[recommendations] best_match:', payload?.best_match);
          console.log('[recommendations] best_group:', payload?.best_group);
          console.log('[recommendations] other_alternatives:', payload?.other_alternatives);
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

  //

  function splitAndFormat(apiString?: string) {
    if (!apiString) return { dateText: '', timeText: '' };
    const [dateRaw, timeRaw] = String(apiString).split('·').map((s) => s.trim());
    // Date
    let dateText = '';
    try {
      const d = new Date(dateRaw);
      const fmt = new Intl.DateTimeFormat(undefined, { month: 'short', day: '2-digit', year: 'numeric' });
      dateText = fmt.format(d);
    } catch {}
    // Time -> 12h
    const to12 = (t?: string) => {
      if (!t) return '';
      if (/am|pm/i.test(t)) return t;
      const [h, m] = t.split(':');
      const hh = parseInt(h || '0', 10);
      const mm = (m || '00').slice(0, 2);
      const ampm = hh >= 12 ? 'PM' : 'AM';
      const h12 = (hh % 12) || 12;
      return `${String(h12).padStart(2, '0')}:${mm} ${ampm}`;
    };
    const timeText = to12(timeRaw);
    return { dateText, timeText };
  }

  // Prefer formatting from ISO in IST (Asia/Kolkata)
  function formatIstFromIso(iso?: string | null | undefined) {
    if (!iso) return null;
    try {
      const d = new Date(iso);
      const dateText = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).format(d);
      const timeText = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(d);
      return { dateText, timeText };
    } catch {
      return null;
    }
  }

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
          <svg className="w-6 h-6 text-yellow-400 icon-glow" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <div>
            <h3 className="text-2xl font-bold text-white">Best Match</h3>
            <p className="text-white/60 text-xs">Individual travelers with the highest compatibility score</p>
          </div>
        </div>
        {bestMatch ? (
          <TravelCard
            initials={getInitials(bestMatch.user?.name || bName(bestMatch.ticket))}
            name={bestMatch.user?.name || bName(bestMatch.ticket)}
            subtitle={(bestMatch.user?.batch || 'Student')}
            email={bestMatch.user?.email || bestMatch.ticket?.email || ''}
            from={bestMatch.ticket?.source || '—'}
            to={bestMatch.ticket?.destination || '—'}
            dateText={(formatIstFromIso(bestMatch.ticket?.departure_at)?.dateText) || splitAndFormat([bestMatch?.date, bestMatch?.time].filter(Boolean).join(' · ')).dateText}
            timeText={(formatIstFromIso(bestMatch.ticket?.departure_at)?.timeText) || splitAndFormat([bestMatch?.date, bestMatch?.time].filter(Boolean).join(' · ')).timeText}
            score={bestMatch.score}
            whatsappLink={bestMatch?.user?.whatsappLink || bestMatch?.ticket?.whatsappLink}
          />
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="text-white/80 text-sm font-semibold">No best match yet</div>
              <div className="text-white/60 text-xs">Check back later as new trips appear nearby.</div>
            </div>
          </div>
        )}
      </div>

      {/* Best Group */}
      <div className="frosted-card">
        <div className="flex items-center space-x-3 mb-6">
          <svg className="w-6 h-6 text-cyan-300 icon-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div>
            <h3 className="text-2xl font-bold text-white">Best Group</h3>
            <p className="text-white/60 text-xs">Groups of travelers that match your preferences</p>
          </div>
        </div>
        {bestGroup && bestGroup.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {bestGroup.map((m, idx) => (
              <TravelCard
                key={idx}
                initials={getInitials(m.user?.name || bName(m.ticket))}
                name={m.user?.name || bName(m.ticket)}
                subtitle={(m.user?.batch || 'Student')}
                email={m.user?.email || m.ticket?.email || ''}
                from={m.ticket?.source || '—'}
                to={m.ticket?.destination || '—'}
                dateText={(formatIstFromIso(m.ticket?.departure_at)?.dateText) || splitAndFormat([m?.date, m?.time].filter(Boolean).join(' · ')).dateText}
                timeText={(formatIstFromIso(m.ticket?.departure_at)?.timeText) || splitAndFormat([m?.date, m?.time].filter(Boolean).join(' · ')).timeText}
                score={m.score}
                whatsappLink={m?.user?.whatsappLink || m?.ticket?.whatsappLink}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <div className="text-white/80 text-sm font-semibold">No group matches yet</div>
              <div className="text-white/60 text-xs">We’ll show groups when compatible plans are available.</div>
            </div>
          </div>
        )}
      </div>

      {/* Alternatives */}
      <div className="frosted-card">
        <div className="flex items-center space-x-3 mb-6">
          <svg className="w-6 h-6 text-orange-300 icon-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div>
            <h3 className="text-2xl font-bold text-white">Other Alternatives</h3>
            <p className="text-white/60 text-xs">Other potential matches and opportunities</p>
          </div>
        </div>
            {alternatives && alternatives.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {alternatives.map((alt, idx: number) => (
              <TravelCard
                key={idx}
                initials={getInitials(alt.user?.name || bName(alt.ticket))}
                name={alt.user?.name || bName(alt.ticket)}
                subtitle={(alt.user?.batch || 'Student')}
                email={alt.user?.email || alt.ticket?.email || ''}
                from={alt.ticket?.source || '—'}
                to={alt.ticket?.destination || '—'}
                dateText={(formatIstFromIso(alt.ticket?.departure_at)?.dateText) || splitAndFormat([alt?.date, alt?.time].filter(Boolean).join(' · ')).dateText}
                timeText={(formatIstFromIso(alt.ticket?.departure_at)?.timeText) || splitAndFormat([alt?.date, alt?.time].filter(Boolean).join(' · ')).timeText}
                score={alt?.score}
                whatsappLink={alt?.user?.whatsappLink || alt?.ticket?.whatsappLink}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div>
              <div className="text-white/80 text-sm font-semibold">No alternatives at the moment</div>
              <div className="text-white/60 text-xs">Check back soon as more trips get added.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


