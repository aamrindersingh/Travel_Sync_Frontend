// client
'use client';

import { useMemo } from 'react';

type TicketStatus = 'active' | 'completed' | 'cancelled';

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
      return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30';
    case 'completed':
      return 'text-sky-300 bg-sky-500/10 border-sky-500/30';
    case 'cancelled':
      return 'text-rose-300 bg-rose-500/10 border-rose-500/30';
    default:
      return 'text-zinc-300 bg-zinc-500/10 border-zinc-500/30';
  }
}

export default function ClientTicketCard({ ticketId }: ClientTicketCardProps) {
  // TODO: replace with real data fetch
  const ticket = {
    id: ticketId,
    source: 'New York',
    destination: 'Los Angeles',
    date: '2024-03-15',
    time: '09:00', // 24h format
    status: 'active' as TicketStatus,
  };

  const formattedDate = useMemo(
    () => new Date(ticket.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
    [ticket.date]
  );
  const formattedTime = useMemo(() => formatTime12h(ticket.time), [ticket.time]);

  return (
    <div className="ticket-modern p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-white truncate">
            {ticket.source} → {ticket.destination}
          </h3>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border tracking-wide uppercase ${getStatusColor(ticket.status)}`}>
          {ticket.status}
        </span>
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
        <span>Created {new Date().toLocaleDateString()}</span>
        <svg className="w-5 h-5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
      </div>
    </div>
  );
}
