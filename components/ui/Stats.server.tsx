// server
export default function Stats() {
  // TODO: fetch stats data from /lib/api.ts
  // Small animated counters as TODO (optionally use client for counter)
  
  const stats = [
    {
      number: "1,200+",
      label: "Active Students",
      description: "Students actively looking for travel companions",
      icon: "👥"
    },
    {
      number: "500+", 
      label: "Successful Matches",
      description: "Successful travel partnerships created",
      icon: "🤝"
    },
    {
      number: "$50,000+",
      label: "Money Saved",
      description: "Total savings from shared travel costs",
      icon: "💰"
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--neon-accent-soft)] to-transparent opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by <span className="neon-text">Thousands</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Join a growing community of travelers who have discovered the benefits of shared journeys
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stats-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{stat.icon}</div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-[var(--neon-accent)]">
                    {stat.label}
                  </div>
                </div>
              </div>
              
              <p className="text-white/60 text-sm leading-relaxed">
                {stat.description}
              </p>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/40">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Verified Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Secure Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
