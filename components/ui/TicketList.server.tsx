// server
import Link from 'next/link';

interface Ticket {
  id: string;
  source: string;
  destination: string;
  date: string;
  time: string; // expects HH:mm (24h) or already 12h
  transportMode: string;
  status: 'active' | 'completed' | 'cancelled';
  matchesCount: number;
}

interface TicketListProps {
  tickets?: Ticket[];
}

function formatTime12h(time24: string): string {
  // Accepts "HH:mm" or already formatted strings
  if (!/^[0-2]?\d:\d{2}$/.test(time24)) return time24;
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  const hh = String(h).padStart(2, "0");
  return `${hh}:${mStr} ${ampm}`;
}

export default function TicketList({ tickets = [] }: TicketListProps) {
  // TODO: Fetch tickets from API
  // TODO: Handle loading and error states
  // TODO: Implement pagination if needed
  
  const mockTickets: Ticket[] = [
    {
      id: '1',
      source: 'New York',
      destination: 'Los Angeles',
      date: '2024-03-15',
      time: '09:00',
      transportMode: 'Flight',
      status: 'active',
      matchesCount: 12
    },
    {
      id: '2',
      source: 'San Francisco',
      destination: 'Seattle',
      date: '2024-04-10',
      time: '14:30',
      transportMode: 'Train',
      status: 'active',
      matchesCount: 8
    },
    {
      id: '3',
      source: 'Chicago',
      destination: 'Miami',
      date: '2024-02-28',
      time: '11:15',
      transportMode: 'Bus',
      status: 'completed',
      matchesCount: 15
    }
  ];

  const displayTickets = tickets.length > 0 ? tickets : mockTickets;

  const getStatusColor = (status: string) => {
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
  };

  return (
    <div className="space-y-6">
      {displayTickets.length === 0 ? (
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
          <Link
            href="/create"
            className="btn-primary"
          >
            Create Your First Ticket
          </Link>
        </div>
      ) : (
        displayTickets.map((ticket) => {
          const formattedDate = new Date(ticket.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
          const formattedTime = formatTime12h(ticket.time);
          return (
            <Link key={ticket.id} href={`/tickets/${ticket.id}`} className="block group ticket-modern p-6 cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[var(--neon-accent)] transition-colors truncate">
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
                <svg className="w-5 h-5 text-white/40 group-hover:text-[var(--neon-accent)] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
