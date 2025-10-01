// client
'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';

type TicketStatus = 'active' | 'completed' | 'cancelled' | 'open' | 'closed';

interface ClientTicketCardProps {
  ticketId: string;
}

function formatTime12h(time24: string): string {
  if (!/^[0-2]?\d:\d{2}$/.test(time24)) return time24;
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  const hh = String(h).padStart(2, '0');
  return `${hh}:${mStr} ${ampm}`;
}

function getStatusColor(status: TicketStatus) {
  switch (status) {
    case 'active':
    case 'open':
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

export default function ClientTicketCard({ ticketId }: ClientTicketCardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<{
    id: string | number;
    source: string;
    destination: string;
    departure_at: string;
    time_diff_mins: number;
    empty_seats: number;
    phone_number: string;
    status?: TicketStatus;
    created_at?: string;
    updated_at?: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    api.getTravel(ticketId)
      .then((res) => {
        const data = res?.data ?? res; // API returns { success, data }
        if (!mounted) return;
        setTicket(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.response?.data?.error || 'Failed to load ticket');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [ticketId]);

  const formattedDate = useMemo(() => {
    const iso = ticket?.departure_at;
    if (!iso) return '';
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }, [ticket?.departure_at]);

  const formattedTime = useMemo(() => {
    const iso = ticket?.departure_at;
    if (!iso) return '';
    const d = new Date(iso);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return formatTime12h(`${hh}:${mm}`);
  }, [ticket?.departure_at]);

  if (loading) {
    return (
      <div className="ticket-modern p-6">
        <div className="flex items-center space-x-3 text-white/80">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
          <span>Fetching your ticket...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ticket-modern p-6">
        <p className="text-rose-300">{error}</p>
      </div>
    );
  }

  if (!ticket) return null;

  return (
    <div
      className="ticket-modern ticket-selected p-6"
      style={{ transform: 'none', boxShadow: 'none' }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-white truncate">
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
      </div>
    </div>
  );
}
