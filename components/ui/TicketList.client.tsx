'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';

interface TravelTicket {
  id: number;
  source: string;
  destination: string;
  departure_at: string; // ISO
  time_diff_mins: number;
  empty_seats: number;
  phone_number: string;
  status?: 'open' | 'closed' | string;
  created_at?: string;
  updated_at?: string;
}

function formatTime12hFromIso(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const hNum = parseInt(hh, 10);
  const ampm = hNum >= 12 ? 'PM' : 'AM';
  const h12 = hNum % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${mm} ${ampm}`;
}

function getStatusColor(status?: string) {
  switch (status) {
    case 'open':
    case 'active':
      return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30';
    case 'completed':
    case 'closed':
      return 'text-sky-300 bg-sky-500/10 border-sky-500/30';
    case 'cancelled':
      return 'text-rose-300 bg-rose-500/10 border-rose-500/30';
    default:
      return 'text-zinc-300 bg-zinc-500/10 border-zinc-500/30';
  }
}

export default function TicketListClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<TravelTicket[]>([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    api
      .getTravels()
      .then((res) => {
        if (!mounted) return;
        const data = (res?.data ?? res) as { success?: boolean; data?: TravelTicket[] } | TravelTicket[];
        const list = Array.isArray(data) ? data : data?.data || [];
        setTickets(list);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.response?.data?.error || 'Failed to load tickets');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-3 text-white/80">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
          <span>Fetching your tickets...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-rose-300">{error}</div>;
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--neon-accent)] to-[var(--neon-accent-2)] flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">No tickets yet</h3>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Create your first travel ticket to start finding companions and saving money on your journeys.
        </p>
        <Link href="/create" className="btn-primary">Create Your First Ticket</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tickets.map((ticket) => {
        const formattedDate = new Date(ticket.departure_at).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        const formattedTime = formatTime12hFromIso(ticket.departure_at);
        return (
          <Link key={ticket.id} href={`/tickets/${ticket.id}`} className="block group ticket-modern p-6 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-white group-hover:text-[var(--neon-accent)] transition-colors truncate">
                  {ticket.source} → {ticket.destination}
                </h3>
              </div>
              {ticket.status && (
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border tracking-wide uppercase ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>{formattedTime}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-white/60">
              <span>Empty seats: {ticket.empty_seats}</span>
              <svg className="w-5 h-5 text-white/40 group-hover:text-[var(--neon-accent)] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
}


