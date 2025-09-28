// server
import MatchGroup from '@/components/ui/MatchGroup.server';
import ClientTicketCard from './client-ticket-card';

interface TicketPageProps {
  params: {
    ticketId: string;
  };
}

export default function TicketPage({ params }: TicketPageProps) {
  // TODO: Server (SSR) with short revalidate header or ISR
  // TODO: Show three groups: Best Match, Best Group, Other Alternatives
  // TODO: Use server component to compute and render initial matches
  // TODO: Handle ticket not found case
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ticket Details</h1>
          <p className="text-gray-600 mt-2">Ticket ID: {params.ticketId}</p>
        </div>

        {/* Ticket Card */}
        <div className="mb-8">
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
