// server
import Link from 'next/link';
import TravelMap from '@/components/ui/TravelMap.client';

// SSG: set revalidate = 3600 (1 hour) or as needed
export const revalidate = 3600;

export default function HomePage() {
  // TODO: fetch homepage data from /lib/api.ts
  // SSG - public landing / marketing page
  // Cache long-term for performance
  
  return (
    <div className="h-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-full flex items-center overflow-hidden">
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/5 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-900/5 to-transparent"></div>
        
        {/* Floating Blinking Elements */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400/60 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400/70 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/6 w-2.5 h-2.5 bg-cyan-300/50 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-300/60 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-cyan-500/55 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-2/3 right-1/6 w-2 h-2 bg-blue-500/65 rounded-full animate-pulse delay-3000"></div>
        
        {/* Larger Floating Elements */}
        <div className="absolute top-1/6 right-1/5 w-4 h-4 bg-gradient-to-r from-cyan-400/40 to-blue-400/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/6 left-1/5 w-3.5 h-3.5 bg-gradient-to-r from-blue-400/35 to-cyan-400/35 rounded-full animate-pulse delay-1200"></div>
        
        {/* Additional Visible Elements */}
        <div className="absolute top-1/5 left-1/2 w-2 h-2 bg-cyan-600/50 rounded-full animate-pulse delay-800"></div>
        <div className="absolute bottom-1/5 right-1/2 w-2.5 h-2.5 bg-blue-600/45 rounded-full animate-pulse delay-1800"></div>
        <div className="w-full h-full flex flex-col lg:flex-row items-center gap-8 px-4 sm:px-6 lg:px-8 py-6">
          {/* Left Content */}
          <div className="flex-1 space-y-4 sm:space-y-6 flex flex-col justify-center lg:ml-8 xl:ml-16 2xl:ml-24 relative z-10">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="block text-white">Find Your Travel</span>
                <span className="block bg-gradient-to-r from-[#4ECDC4] to-[#45B7D1] bg-clip-text text-transparent">Buddy.</span>
                <span className="block text-white">Save Money.</span>
                <span className="block bg-gradient-to-r from-[#45B7D1] to-[#96CEB4] bg-clip-text text-transparent">Share the Ride.</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xl sm:max-w-2xl leading-relaxed">
                Connect with fellow students traveling to the same destination. Split costs, make friends, and travel safely together.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                href="/create"
                className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl font-bold text-sm sm:text-base lg:text-lg text-white transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 lg:space-x-4 bg-gradient-to-r from-[#4ECDC4]/20 to-[#45B7D1]/20 backdrop-blur-sm border-2 border-[#4ECDC4]/40 hover:from-[#4ECDC4]/30 hover:to-[#45B7D1]/30 hover:border-[#4ECDC4]/60 shadow-xl hover:shadow-[0_0_30px_rgba(78,205,196,0.4)] hover:scale-105"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Travel Ticket</span>
              </Link>
              
              <Link
                href="/find"
                className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl font-bold text-sm sm:text-base lg:text-lg text-white transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 lg:space-x-4 bg-gradient-to-r from-[#45B7D1]/15 to-[#96CEB4]/15 backdrop-blur-sm border-2 border-[#45B7D1]/30 hover:from-[#45B7D1]/25 hover:to-[#96CEB4]/25 hover:border-[#45B7D1]/50 shadow-xl hover:shadow-[0_0_25px_rgba(69,183,209,0.3)] hover:scale-105"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search Travel Buddy</span>
              </Link>
            </div>
          </div>

          {/* Travel Map in Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute right-0 bottom-4 sm:bottom-6 lg:bottom-8 w-1/2 sm:w-3/5 lg:w-1/2 h-3/4 sm:h-4/5 lg:h-5/6" style={{marginRight: 'clamp(-64px, -8vw, -128px)'}}>
              <TravelMap />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
