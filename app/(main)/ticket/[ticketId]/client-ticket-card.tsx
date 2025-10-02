// client
'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext.client';

interface ClientTicketCardProps {
  ticketId: string;
}

export default function ClientTicketCard({ ticketId }: ClientTicketCardProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const { user, profilePhone } = useAuth();

  const whatsappHref = useMemo(() => {
    const displayName = (() => {
      const email = user?.email || '';
      const local = email.split('@')[0] || '';
      return local ? local.charAt(0).toUpperCase() + local.slice(1) : 'A fellow student';
    })();
    const phone = profilePhone ? `+91-${profilePhone}` : undefined;
    const intro = `Hello!`;
    const line1 = `I am ${displayName}.`;
    const line2 = `I'm interested in sharing a cab for ticket #${ticketId}.`;
    const line3 = `If you're open to coordinating, please let me know.`;
    const line4 = phone ? `You can reach me on WhatsApp at ${phone}.` : '';
    const signature = `Thanks!`;
    const message = [intro, '', line1, line2, line3, '', line4, '', signature]
      .filter(Boolean)
      .join('\n');
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [user?.email, profilePhone, ticketId]);

  const handleConnect = async () => {
    // TODO: Implement WhatsApp connection
    // TODO: Handle connection state
    setIsConnecting(true);
  };

  const handleRequestToJoin = async () => {
    // TODO: Implement request to join functionality
    // TODO: Handle request state
    setIsRequesting(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Travel to Paris</h2>
          <p className="text-gray-600">March 15-22, 2024</p>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Budget</p>
          <p className="font-medium">$800 - $1200</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Group Size</p>
          <p className="font-medium">2-4 people</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Interests</p>
          <p className="font-medium">Culture, Food, History</p>
        </div>
      </div>

      <p className="text-gray-700 mb-6">
        Looking for travel companions to explore Paris together. Interested in visiting museums, 
        trying local cuisine, and experiencing the city&apos;s rich culture.
      </p>

      <div className="flex space-x-4">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsConnecting(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <span>{isConnecting ? 'Preparing…' : 'Connect via WhatsApp'}</span>
        </a>

        <button
          onClick={handleRequestToJoin}
          disabled={isRequesting}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isRequesting ? 'Requesting...' : 'Request to Join'}
        </button>
      </div>
    </div>
  );
}
