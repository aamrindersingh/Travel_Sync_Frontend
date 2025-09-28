// server
import TicketList from '@/components/ui/TicketList.server';

export default function TicketsPage() {
  // TODO: Server (SSR) - render user's tickets quickly
  // TODO: Use cached fetch to Go backend
  // TODO: Handle loading states and error states
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
          <p className="text-gray-600 mt-2">Manage your travel tickets and find matches</p>
        </div>
        
        <TicketList />
      </div>
    </div>
  );
}
