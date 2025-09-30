// server
import Link from 'next/link';

interface Ticket {
  id: string;
  source: string;
  destination: string;
  date: string;
  time: string;
  transportMode: string;
  status: 'active' | 'completed' | 'cancelled';
  matchesCount: number;
}

interface TicketListProps {
  tickets?: Ticket[];
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
        displayTickets.map((ticket) => (
          <div key={ticket.id} className="group ticket-modern p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--neon-accent)] transition-colors">
                  {ticket.source} → {ticket.destination}
                </h3>
                <p className="text-white/70">
                  {new Date(ticket.date).toLocaleDateString()} at {ticket.time}
                </p>
              </div>
              <div className="flex items-center">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border tracking-wide uppercase ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
            </div>

            <div className="mb-6 text-white/80 text-sm">
              <span className="text-white/60">Time:</span> {ticket.time}
            </div>

            <div className="ticket-divider mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-white/60">
                Created {new Date().toLocaleDateString()}
              </div>
              <div className="flex space-x-4">
                <Link
                  href={`/tickets/${ticket.id}`}
                  className="text-[var(--neon-accent)] hover:text-[var(--neon-accent-2)] font-medium transition-colors"
                >
                  View Details →
                </Link>
                <button className="text-white/60 hover:text-white font-medium transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
