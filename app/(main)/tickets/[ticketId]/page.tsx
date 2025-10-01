// server
import ClientTicketCard from './client-ticket-card';
import Recommendations from './recommendations.client';

interface TicketPageProps {
  params: Promise<{
    ticketId: string;
  }>;
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  // TODO: fetch ticket data from /lib/api.ts
  // SSR/ISR: ticket detail + three groups view (Best Match, Best Group, Other Alternatives)
  // Use short TTL (revalidate 10s) in comment
  // export const revalidate = 10;
  
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Ticket
          </h1>
          <p className="text-xl text-white/70">
            Find your perfect travel companions for this journey
          </p>
        </div>

        {/* Ticket Card */}
        <div className="mb-8">
          <ClientTicketCard ticketId={ticketId} />
        </div>

        {/* Recommendations */}
        {/* Note: Recommendation component will read ticket status via its own fetch; it should hide content if closed.
            As a quick guard, keep as-is; status check is inside client component when needed. */}
        <Recommendations ticketId={ticketId} />
      </div>
    </div>
  );
}
