// server
import Link from "next/link";
import TravelMap from "@/components/ui/TravelMap.client";
import OnboardingGate from "./onboarding-gate.client";

// SSG: set revalidate = 3600 (1 hour) or as needed
export const revalidate = 3600;

export default function HomePage() {
  // TODO: fetch homepage data from /lib/api.ts
  // SSG - public landing / marketing page
  // Cache long-term for  performance

  return (
    <div className="home-page-container">
      <OnboardingGate />
      <section className="relative h-full flex flex-col lg:flex-row items-center justify-center gap-x-16 lg:gap-x-32 py-10">
        {/* Left Content */}
        <div className="basis-1/2 flex flex-col justify-center space-y-6 sm:space-y-8 relative z-10 ml-40 lg:ml-56 xl:ml-64">
          <h1
            className="font-bold leading-tight"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
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
            style={{ fontSize: "clamp(0.875rem, 2vw, 1.25rem)" }}
          >
            Connect with fellow students traveling to the same destination.
            Split costs, make friends, and travel safely together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-4 sm:gap-6">
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
              <span className="whitespace-nowrap">Create Ticket</span>
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
              <span className="whitespace-nowrap">Search Buddy</span>
            </Link>
          </div>
        </div>

        {/* Travel Map */}
        <div className="basis-1/2 flex justify-end items-center pr-8 lg:pr-12 xl:pr-16">
          <TravelMap className="w-full h-auto scale-115 lg:scale-130 xl:scale-150" />
        </div>
      </section>
    </div>
  );
}
