'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<TravelTicket[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    source: '',
    destination: '',
    date: '',
    hour: '',
    minute: '',
    ampm: '',
    time_diff_mins: 15,
    empty_seats: 1,
    phone_number: '',
    status: '' as 'open' | 'closed' | ''
  });

  const sortTicketsForDisplay = (arr: TravelTicket[]) => {
    return [...arr].sort((a, b) => {
      const aClosed = (a.status || '').toLowerCase() === 'closed';
      const bClosed = (b.status || '').toLowerCase() === 'closed';
      if (aClosed !== bClosed) return aClosed ? 1 : -1; // closed go to bottom
      return 0;
    });
  };

  // Compact copies of location options (match create form)
  const HOSTELS = useMemo(() => [
    'Uniworld-1',
    'Uniworld-2',
  ] as const, []);
  const AIRPORT_TERMINALS = useMemo(() => [
    'Kempegowda International Airport Terminal-1',
    'Kempegowda International Airport Terminal-2',
  ] as const, []);
  const RAILWAY_STATIONS = useMemo(() => [
    'KSR SBC Bengaluru Junction',
    'SMVT Bengaluru railway station',
    'Krishnarajapuram Railway Station',
    'Yesvantpur Junction Railway station',
    'Banglore Cantonment Railway Station',
    'Bengaluru East Railway Station',
  ] as const, []);
  const allLocations = useMemo(
    () => [
      ...AIRPORT_TERMINALS,
      ...RAILWAY_STATIONS,
      ...HOSTELS,
    ],
    [AIRPORT_TERMINALS, RAILWAY_STATIONS, HOSTELS]
  );
  const destinationOptions = useMemo(() => {
    const src = form.source;
    if (!src) return allLocations;
    const isAirport = (AIRPORT_TERMINALS as readonly string[]).includes(src);
    const isHostel = (HOSTELS as readonly string[]).includes(src);
    if (isAirport) return [...HOSTELS];
    if (isHostel) return [...AIRPORT_TERMINALS, ...RAILWAY_STATIONS];
    return allLocations.filter((opt) => opt !== src);
  }, [form.source, allLocations, AIRPORT_TERMINALS, HOSTELS, RAILWAY_STATIONS]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    api
      .getMyTravels()
      .then((res) => {
        if (!mounted) return;
        const data = (res?.data ?? res) as { success?: boolean; data?: TravelTicket[] } | TravelTicket[];
        const list = Array.isArray(data) ? data : data?.data || [];
        setTickets(sortTicketsForDisplay(list));
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

  const beginEdit = (t: TravelTicket) => {
    const d = new Date(t.departure_at);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hours24 = d.getHours();
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const h12 = hours24 % 12 || 12;
    const hh = String(h12).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    setForm({
      source: t.source,
      destination: t.destination,
      date: `${yyyy}-${mm}-${dd}`,
      hour: hh,
      minute: mi,
      ampm,
      time_diff_mins: t.time_diff_mins,
      empty_seats: t.empty_seats,
      phone_number: t.phone_number,
      status: (t.status as unknown as string) === 'closed' ? 'closed' : 'open',
    });
    setEditingId(t.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'time_diff_mins' || name === 'empty_seats' ? Number(value) : value,
    }));
  };

  const saveEdit = async (id: number) => {
    setSaving(true);
    try {
      let h = parseInt(form.hour || '0', 10) || 0;
      const m = parseInt(form.minute || '0', 10) || 0;
      const ampm = form.ampm;
      if (ampm === 'AM') {
        if (h === 12) h = 0;
      } else if (ampm === 'PM') {
        if (h !== 12) h = h + 12;
      }
      const [Y, M, D] = form.date.split('-').map((n) => parseInt(n, 10));
      const iso = new Date(Y, M - 1, D, h, m, 0, 0).toISOString();
      const payload = {
        source: form.source,
        destination: form.destination,
        departure_at: iso,
        time_diff_mins: form.time_diff_mins,
        empty_seats: form.empty_seats,
        phone_number: form.phone_number,
        ...(form.status ? { status: form.status as 'open' | 'closed' } : {}),
      };
      const res = await api.updateTravel(id, payload);
      const updated = res?.data ?? res;
      setTickets((prev) => sortTicketsForDisplay(prev.map((t) => (t.id === id ? { ...t, ...updated } : t))));
      setEditingId(null);
    } catch (err) {
      const maybeAxios = err as { response?: { data?: { error?: string } } } | undefined;
      setError(maybeAxios?.response?.data?.error || 'Failed to update ticket');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {tickets.map((ticket) => {
        const formattedDate = new Date(ticket.departure_at).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        const formattedTime = formatTime12hFromIso(ticket.departure_at);
        const isEditing = editingId === ticket.id;
        return (
          <div
            key={ticket.id}
            className={`group ticket-modern p-6 ${ticket.status === 'closed' ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
            onClick={() => {
              if (!isEditing && ticket.status !== 'closed') router.push(`/tickets/${ticket.id}`);
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-white group-hover:text-[var(--neon-accent)] transition-colors truncate">
                  {ticket.source} → {ticket.destination}
                </h3>
              </div>
              {!isEditing && ticket.status && (
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border tracking-wide uppercase ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              )}
              {isEditing && (
                <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.04] p-1">
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, status: 'open' }))}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${form.status !== 'closed' ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/30' : 'text-white/70 hover:text-white border border-transparent'}`}
                  >
                    Open
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, status: 'closed' }))}
                    className={`ml-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${form.status === 'closed' ? 'text-rose-300 bg-rose-500/10 border border-rose-500/30' : 'text-white/70 hover:text-white border border-transparent'}`}
                  >
                    Closed
                  </button>
                </div>
              )}
            </div>

            {!isEditing ? (
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
            ) : (
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm relative z-10"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Source */}
                <div className="group">
                  <label className="block text-xs font-semibold text-white mb-1 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2"></span>
                    From (Source)
                  </label>
                  <div className="relative">
                    <select
                      name="source"
                      value={form.source}
                      onChange={onFormChange}
                      className="w-full px-3 py-2 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 hover:bg-white/8"
                    >
                      <option value="" disabled>Select source</option>
                      {allLocations.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>
                </div>
                {/* Destination */}
                <div className="group">
                  <label className="block text-xs font-semibold text-white mb-1 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2"></span>
                    To (Destination)
                  </label>
                  <div className="relative">
                    <select
                      name="destination"
                      value={form.destination}
                      onChange={onFormChange}
                      className="w-full px-3 py-2 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 hover:bg-white/8"
                    >
                      <option value="" disabled>Select destination</option>
                      {destinationOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>
                </div>
                {/* Date */}
                <div className="group">
                  <label className="block text-xs font-semibold text-white mb-1 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2"></span>
                    Travel Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={onFormChange}
                      className="w-full px-3 py-2 pl-10 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  </div>
                </div>
                {/* Time (12h) */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-3 -mb-1">
                    <label className="block text-xs font-semibold text-white mb-1 flex items-center">
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2"></span>
                      Preferred Time
                    </label>
                  </div>
                  <div className="relative">
                    <select name="hour" value={form.hour} onChange={onFormChange} className="w-full px-3 py-2 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)]">
                      <option value="" disabled>HH</option>
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => (
                        <option key={h} value={h} className="bg-[#0a0a0a]">{h}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select name="minute" value={form.minute} onChange={onFormChange} className="w-full px-3 py-2 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)]">
                      <option value="" disabled>MM</option>
                      {Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0')).map(m => (
                        <option key={m} value={m} className="bg-[#0a0a0a]">{m}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select name="ampm" value={form.ampm} onChange={onFormChange} className="w-full px-3 py-2 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)]">
                      <option value="" disabled>AM/PM</option>
                      <option value="AM" className="bg-[#0a0a0a]">AM</option>
                      <option value="PM" className="bg-[#0a0a0a]">PM</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>
                </div>
                {/* Time Difference (compact slider) and Empty Seats */}
                <div className="grid grid-cols-1 gap-2 md:col-span-2">
                  <label className="block text-xs font-semibold text-white mb-1 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2"></span>
                    Acceptable Time Difference <span className="ml-2 text-[var(--neon-accent)] font-bold">{form.time_diff_mins} mins</span>
                    <span className="ml-2 text-white/70 text-[10px]">(~{(form.time_diff_mins/60).toFixed(1)} hr)</span>
                  </label>
                  <input type="range" min={0} max={300} step={5} name="time_diff_mins" value={form.time_diff_mins} onChange={onFormChange} className="w-full h-2 bg-white/10 rounded-lg appearance-none accent-[var(--neon-accent)]" />
                </div>
                <div className="group">
                  <label className="block text-xs font-semibold text-white mb-1 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2"></span>
                    Empty Seats
                  </label>
                  <div className="relative">
                    <select name="empty_seats" value={form.empty_seats} onChange={onFormChange} className="w-full px-3 py-2 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)]">
                      {[1,2,3,4,5,6].map((n) => (
                        <option key={n} value={n} className="bg-[#0a0a0a]">{n}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>
                </div>
                {/* Phone */}
                <div className="group md:col-span-2">
                  <label className="block text-xs font-semibold text-white mb-1 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2"></span>
                    Contact Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone_number"
                      value={form.phone_number}
                      onChange={onFormChange}
                      className="w-full px-3 py-2 pl-10 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      placeholder="Your WhatsApp number"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between text-sm text-white/60">
              <span>Empty seats: {ticket.empty_seats}</span>
              <div className="flex items-center gap-3">
                {!isEditing ? (
                  <>
                    <button
                      disabled={ticket.status === 'closed'}
                      onClick={(e) => { e.stopPropagation(); beginEdit(ticket); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${ticket.status === 'closed' ? 'text-white/40 border border-white/10 bg-white/[0.02] cursor-not-allowed' : 'text-white/90 border border-white/10 bg-white/[0.03] hover:text-white hover:border-[var(--neon-accent)]/40 hover:shadow-[0_0_18px_rgba(0,228,255,0.25)]'}`}
                    >
                      Edit
                    </button>
                    <button
                      disabled={ticket.status === 'closed'}
                      title="Delete"
                      aria-label="Delete ticket"
                      onClick={async (e) => { e.stopPropagation(); if (!confirm('Delete this ticket?')) return; try { await api.deleteTravel(ticket.id); setTickets((prev)=>prev.filter(t=>t.id!==ticket.id)); } catch (err) { const maybeAxios = err as { response?: { data?: { error?: string } } } | undefined; setError(maybeAxios?.response?.data?.error || 'Failed to delete ticket'); } }}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-md border text-rose-300 transition-colors ${ticket.status === 'closed' ? 'border-white/10 bg-white/[0.02] cursor-not-allowed opacity-50' : 'border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20'}`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0V5a2 2 0 012-2h2a2 2 0 012 2v2"/></svg>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); cancelEdit(); }} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white/80 border border-white/10 bg-white/[0.02] hover:text-white hover:bg-white/[0.06] transition-all">Cancel</button>
                    <button disabled={saving} onClick={(e) => { e.stopPropagation(); saveEdit(ticket.id); }} className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[var(--neon-accent)]/90 hover:bg-[var(--neon-accent)] shadow-[0_8px_24px_rgba(0,228,255,0.35)] hover:shadow-[0_10px_28px_rgba(0,228,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 transition-all">{saving ? 'Saving…' : 'Save'}</button>
                  </>
                )}
                {ticket.status !== 'closed' ? (
                  <Link href={`/tickets/${ticket.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-white/10 text-white/60 hover:text-[var(--neon-accent)] hover:border-[var(--neon-accent)]/40 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                ) : (
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-white/10 text-white/40">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


