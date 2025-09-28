// client
'use client';

import { useState } from 'react';

interface ClientTicketCardProps {
  ticketId: string;
}

export default function ClientTicketCard({ ticketId }: ClientTicketCardProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  // TODO: fetch ticket data from API
  const ticket = {
    id: ticketId,
    source: 'New York',
    destination: 'Los Angeles',
    date: '2024-03-15',
    time: '09:00',
    transportMode: 'Flight',
    phone: '+1-555-0123',
    notes: 'Looking for travel companions to explore LA together. Interested in visiting museums, trying local cuisine, and experiencing the city&apos;s rich culture.',
    status: 'active',
    createdAt: '2024-03-01'
  };

  const handleConnect = async () => {
    // TODO: Implement WhatsApp connection
    setIsConnecting(true);
    setTimeout(() => setIsConnecting(false), 2000);
  };

  const handleRequestToJoin = async () => {
    // TODO: Implement request to join functionality
    setIsRequesting(true);
    setTimeout(() => setIsRequesting(false), 2000);
  };

  return (
    <div className="frosted-card">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {ticket.source} → {ticket.destination}
          </h2>
          <p className="text-white/70">
            {new Date(ticket.date).toLocaleDateString()} at {ticket.time}
          </p>
        </div>
        <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
          {ticket.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--neon-accent)]/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--neon-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white/60">Contact</p>
            <p className="font-medium text-white">{ticket.phone}</p>
          </div>
        </div>
      </div>

      {ticket.notes && (
        <div className="mb-6">
          <p className="text-white/80 leading-relaxed">
            {ticket.notes}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="flex items-center justify-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <span>{isConnecting ? 'Connecting...' : 'Connect via WhatsApp'}</span>
        </button>

        <button
          onClick={handleRequestToJoin}
          disabled={isRequesting}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRequesting ? 'Requesting...' : 'Request to Join'}
        </button>
      </div>
    </div>
  );
}
