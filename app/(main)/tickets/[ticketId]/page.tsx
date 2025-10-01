// server
import MatchGroup from '@/components/ui/MatchGroup.server';
import ClientTicketCard from './client-ticket-card';
import UserBuddies from '@/components/ui/UserBuddies.client';

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
        <div className="mb-8">
          <ClientTicketCard ticketId={params.ticketId} />
        </div>

        {/* Match Groups */}
        <div className="space-y-8">
          <div className="frosted-card">
            <div className="flex items-center space-x-3 mb-6">
              <svg className="w-6 h-6 text-[var(--neon-accent)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div>
                <h3 className="text-2xl font-bold text-white">Best Match</h3>
                <p className="text-white/70 text-sm">Individual travelers with the highest compatibility score</p>
              </div>
            </div>
            <UserBuddies />
          </div>

          <div className="frosted-card">
            <div className="flex items-center space-x-3 mb-6">
              <svg className="w-6 h-6 text-[var(--neon-accent-2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <h3 className="text-2xl font-bold text-white">Best Group</h3>
                <p className="text-white/70 text-sm">Groups of travelers that match your preferences</p>
              </div>
            </div>
            <UserBuddies />
          </div>
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
