// server
import TicketList from '@/components/ui/TicketList.server';

export default function TicketsPage() {
  // TODO: call backend to fetch user's tickets
  // SSR: user's tickets list (requires auth)
  
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            My <span className="neon-text">Travel Tickets</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Manage your travel tickets and connect with fellow travelers
          </p>
        </div>
        
        <TicketList />
      </div>
    </div>
  );
}
