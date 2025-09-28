// server
import CTAButton from './CTAButton.client';

export default function Hero() {
  // Uses public/images/hero.png — copy the provided file to this path
  // TODO: fetch hero data from /lib/api.ts
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F12] via-[#0F1720] to-[#13161A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--neon-accent-soft)] via-transparent to-transparent"></div>
      </div>

      {/* Floating Neon Dots */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-[var(--neon-accent)] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-[var(--neon-accent-2)] rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-[var(--neon-accent-2)] rounded-full animate-pulse opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white">Find Your</span>
                <span className="block neon-text">Travel Buddy</span>
                <span className="block text-white">Save Money.</span>
                <span className="block neon-text">Share the Ride.</span>
              </h1>
              
              <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
                Connect with fellow travelers, split costs, and create unforgettable journeys together. 
                Our smart matching algorithm finds the perfect travel companions for your next adventure.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton 
                href="/create" 
                variant="primary"
                className="w-full sm:w-auto"
              >
                Start Your Journey
              </CTAButton>
              
              <CTAButton 
                href="/find" 
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Find Travel Buddies
              </CTAButton>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-white/60">1000+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-white/60">500+ Successful Matches</span>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="relative">
            <div className="frosted-card max-w-md mx-auto">
              {/* Decorative Corner Dots */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-[var(--neon-accent)] rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-[var(--neon-accent-2)] rounded-full opacity-40"></div>
              <div className="absolute top-4 -right-4 w-1 h-1 bg-[var(--neon-accent)] rounded-full opacity-50"></div>
              
              {/* Card Content */}
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[var(--neon-accent)] to-[var(--neon-accent-2)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Connected Students Network</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Join thousands of students and travelers who have found their perfect travel companions through our platform.
                  </p>
                </div>

                {/* Stats Mini */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--neon-accent)]">1.2K+</div>
                    <div className="text-xs text-white/60">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--neon-accent-2)]">500+</div>
                    <div className="text-xs text-white/60">Matches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--neon-accent)]">$50K+</div>
                    <div className="text-xs text-white/60">Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
