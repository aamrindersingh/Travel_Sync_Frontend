// server
import MatchGroup from '@/components/ui/MatchGroup.server';
import ClientTicketCard from './client-ticket-card';

interface TicketPageProps {
  params: {
    ticketId: string;
  };
}

export default function TicketPage({ params }: TicketPageProps) {
  // TODO: fetch ticket data from /lib/api.ts
  // SSR/ISR: ticket detail + three groups view (Best Match, Best Group, Other Alternatives)
  // Use short TTL (revalidate 10s) in comment
  // export const revalidate = 10;
  
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Ticket <span className="neon-text">#{params.ticketId}</span>
          </h1>
          <p className="text-xl text-white/70">
            Find your perfect travel companions for this journey
          </p>
        </div>

        {/* Ticket Card */}
        <div className="mb-12">
          <ClientTicketCard ticketId={params.ticketId} />
        </div>

        {/* Match Groups */}
        <div className="space-y-8">
          <MatchGroup 
            title="Best Match" 
            type="best-match"
            ticketId={params.ticketId}
          />
          <MatchGroup 
            title="Best Group" 
            type="best-group"
            ticketId={params.ticketId}
          />
          <MatchGroup 
            title="Other Alternatives" 
            type="alternatives"
            ticketId={params.ticketId}
          />
        </div>
      </div>
    </div>
  );
}
