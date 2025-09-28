// server
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown.client";

export default function Header() {
  // TODO: fetch user data from /lib/api.ts

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full max-w-7xl mx-auto rounded-b-2xl shadow-lg border-b-2 border-[#00E4FF] flex items-center justify-between px-8 py-4 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,228,255,0.3)] hover:border-[#00E4FF] backdrop-blur-sm relative overflow-hidden"
    >
      {/* Header Pattern Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/3 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-900/3 to-transparent"></div>
      {/* Logo */}
      <Link
        href="/home"
        className="flex items-center space-x-2 group relative z-10"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E4FF] to-[#7CFFEA] flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-md">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <span className="text-lg font-semibold text-white group-hover:text-[#00E4FF] transition-colors duration-300">
          TravelSync
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-2 relative z-10">
        {[
          { href: "/find", label: "Find" },
          { href: "/tickets", label: "Tickets" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00E4FF]/50"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Profile Dropdown */}
      <div className="relative z-10">
        <ProfileDropdown />
      </div>
    </header>
  );
}
