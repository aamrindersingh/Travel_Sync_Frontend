// server
import Link from "next/link";
import TravelMap from "@/components/ui/TravelMap.client";

// SSG: set revalidate = 3600 (1 hour) or as needed
export const revalidate = 3600;

export default function HomePage() {
  // TODO: fetch homepage data from /lib/api.ts
  // SSG - public landing / marketing page
  // Cache long-term for performance

  return (
    <div className="h-full overflow-hidden">
      <section className="relative h-full flex flex-col lg:flex-row items-center gap-16 px-8 sm:px-10 lg:px-12 py-10">
        {/* Left Content */}
        <div className="flex-1 space-y-8 sm:space-y-10 flex flex-col justify-center ml-12 sm:ml-16 lg:ml-36 xl:ml-44 2xl:ml-52 relative z-10">
          <h1
            className="font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            <span className="block text-white">Find Your Travel</span>
            <span className="block bg-gradient-to-r from-[#4ECDC4] to-[#45B7D1] bg-clip-text text-transparent">
              Buddy.
            </span>
            <span className="block text-white">Save Money.</span>
            <span className="block bg-gradient-to-r from-[#45B7D1] to-[#96CEB4] bg-clip-text text-transparent">
              Share the Ride.
            </span>
          </h1>
          <p
            className="text-gray-300 max-w-2xl leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
          >
            Connect with fellow students traveling to the same destination.
            Split costs, make friends, and travel safely together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="/create"
              className="group relative px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl font-semibold text-base sm:text-lg text-white transition-all duration-300 flex items-center justify-center space-x-3 bg-gradient-to-r from-[#4ECDC4]/30 to-[#45B7D1]/30 backdrop-blur-sm border-2 border-[#4ECDC4]/50 hover:from-[#4ECDC4]/40 hover:to-[#45B7D1]/40 hover:border-[#4ECDC4]/70 shadow-lg hover:shadow-[0_0_25px_rgba(78,205,196,0.4)] hover:scale-105"
            >
              <svg
                className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create Travel Ticket</span>
            </Link>

            <Link
              href="/find"
              className="group relative px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl font-semibold text-base sm:text-lg text-white transition-all duration-300 flex items-center justify-center space-x-3 bg-gradient-to-r from-[#45B7D1]/25 to-[#96CEB4]/25 backdrop-blur-sm border-2 border-[#45B7D1]/40 hover:from-[#45B7D1]/35 hover:to-[#96CEB4]/35 hover:border-[#45B7D1]/60 shadow-lg hover:shadow-[0_0_20px_rgba(69,183,209,0.3)] hover:scale-105"
            >
              <svg
                className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Search Travel Buddy</span>
            </Link>
          </div>
        </div>

        {/* Travel Map */}
        <div className="flex-1 flex justify-center items-center">
          <TravelMap className="w-full h-auto scale-110 lg:scale-125" />
        </div>
      </section>
    </div>
  );
}
