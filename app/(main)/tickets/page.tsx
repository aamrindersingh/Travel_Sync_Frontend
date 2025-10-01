// server
import TicketListClient from '@/components/ui/TicketList.client';

export default function TicketsPage() {
  // TODO: call backend to fetch user's tickets
  // SSR: user's tickets list (requires auth)
  
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
            My Travel Tickets
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Review and manage your trips. Join or edit details with a click.
          </p>
        </div>
        
        <TicketListClient />
      </div>
    </div>
  );
}
