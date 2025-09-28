// server
interface MatchGroupProps {
  title: string;
  type: 'best-match' | 'best-group' | 'alternatives';
  ticketId: string;
  matches?: Array<{
    id: string;
    name?: string;
    description?: string;
    destination?: string;
    dates?: string;
    budget?: string;
    score?: number;
  }>;
}

export default function MatchGroup({ title, type, matches = [] }: MatchGroupProps) {
  // TODO: Fetch matches from API based on type and ticketId
  // TODO: Implement different matching algorithms for each type
  // TODO: Handle loading and error states
  
  const getMatchIcon = (type: string) => {
    switch (type) {
      case 'best-match':
        return (
          <svg className="w-6 h-6 text-[var(--neon-accent)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case 'best-group':
        return (
          <svg className="w-6 h-6 text-[var(--neon-accent-2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'alternatives':
        return (
          <svg className="w-6 h-6 text-[var(--neon-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };

  const getMatchDescription = (type: string) => {
    switch (type) {
      case 'best-match':
        return 'Individual travelers with the highest compatibility score';
      case 'best-group':
        return 'Groups of travelers that match your preferences';
      case 'alternatives':
        return 'Other potential matches and opportunities';
      default:
        return 'Travel matches';
    }
  };

  return (
    <div className="frosted-card">
      <div className="flex items-center space-x-3 mb-6">
        {getMatchIcon(type)}
        <div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-white/70 text-sm">{getMatchDescription(type)}</p>
        </div>
      </div>
      
      <div>
        {matches.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-white/60 text-lg mb-2">No matches found yet</p>
            <p className="text-white/40 text-sm">
              Check back later or try adjusting your preferences
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors group">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--neon-accent)] transition-colors">
                      {match.name || `Match ${index + 1}`}
                    </h4>
                    <p className="text-white/70 text-sm mb-3">
                      {match.description || 'Travel companion match'}
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-white/60">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{match.destination || 'Paris, France'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{match.dates || 'Mar 15-22'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span>{match.budget || '$800-1200'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-[var(--neon-accent)]/20 text-[var(--neon-accent)] border border-[var(--neon-accent)]/30">
                      {match.score || '95%'} match
                    </span>
                    <button className="btn-primary text-sm px-4 py-2">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}