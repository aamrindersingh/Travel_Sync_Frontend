// server
import Link from 'next/link';

export default function FindPage() {
  // TODO: Server (SSR) - shortcut to /tickets or select ticket
  // TODO: Show available tickets for matching
  // TODO: Implement search and filter functionality
  
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Find <span className="neon-text">Travel Companions</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover tickets and find your perfect travel match. Connect with fellow travelers who share your journey.
          </p>
        </div>

        <div className="frosted-card max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[var(--neon-accent)] to-[var(--neon-accent-2)] flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Browse Available Tickets
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Find tickets that match your travel preferences and connect with fellow travelers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tickets"
                className="btn-primary"
              >
                View All Tickets
              </Link>
              
              <span className="flex items-center text-white/40">
                or
              </span>
              
              <Link
                href="/create"
                className="btn-secondary"
              >
                Create Your Own Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
