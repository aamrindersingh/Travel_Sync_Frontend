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
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
              <div className="flex items-center space-x-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                <span className="text-sm text-white/60">
                  {ticket.matchesCount} matches
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--neon-accent)]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--neon-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white/60">Transport</p>
                  <p className="font-medium text-white">{ticket.transportMode}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--neon-accent-2)]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--neon-accent-2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white/60">Time</p>
                  <p className="font-medium text-white">{ticket.time}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--neon-accent)]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--neon-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white/60">Matches</p>
                  <p className="font-medium text-[var(--neon-accent)]">{ticket.matchesCount} found</p>
                </div>
              </div>
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
