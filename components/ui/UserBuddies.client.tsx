"use client";

import Link from "next/link";

export interface BuddyCardProps {
  id: string;
  name: string;
  batch: string;
  time: string; // 12h format string
  source: string;
  destination: string;
  phone_number?: string;
  avatarUrl?: string;
  score?: number; // 0..1
}

const DUMMY_BUDDIES: BuddyCardProps[] = [
  { id: "1", name: "Alex Carter", batch: "ECE '27", time: "09:15 AM", source: "Hostel A", destination: "Airport" },
  { id: "2", name: "Maya Singh", batch: "CSE '26", time: "10:00 AM", source: "Hostel B", destination: "Railway" },
  { id: "3", name: "Ravi Kumar", batch: "ME '25", time: "11:30 AM", source: "Uniworld-1", destination: "Terminal-2" },
  { id: "4", name: "Sara Lee", batch: "IT '27", time: "12:45 PM", source: "KSR Train", destination: "Terminal-1" },
];

export default function UserBuddies({ buddies }: { buddies?: BuddyCardProps[] }) {
  const getInitials = (fullName: string) => {
    const parts = String(fullName || '')
      .trim()
      .split(/\s+/)
      .slice(0, 2);
    const letters = parts.map((p) => p[0]?.toUpperCase() || '').join('');
    return letters || 'T';
  };

  return (
    <div className="user-buddies-row">
      {(buddies && buddies.length > 0 ? buddies : DUMMY_BUDDIES).map((b) => (
        <Link
          key={b.id}
          href={`https://wa.me/${(b.phone_number || '').replace(/\D/g, '') || '0000000000'}`}
          className="user-card"
          target="_blank"
        >
          <div className="flex items-center gap-3 w-full">
            {/* Avatar */}
            {b.avatarUrl ? (
              <img src={b.avatarUrl} alt={b.name} className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/10" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white/80 flex items-center justify-center font-semibold ring-1 ring-white/10">
                {getInitials(b.name)}
              </div>
            )}

            {/* Meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <div className="user-name text-white font-semibold truncate">{b.name || 'Traveler'}</div>
                  <div className="user-batch text-white/60 text-xs">{b.batch || 'Student'}</div>
                </div>
                {typeof b.score === 'number' && (
                  <span className="px-2 py-0.5 text-xs rounded-md bg-[var(--neon-accent)]/20 text-[var(--neon-accent)] border border-[var(--neon-accent)]/30">
                    {Math.round(b.score * 100)}% match
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between text-[13px] text-white/80">
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">{b.time}</span>
                <span className="user-route truncate ml-3 text-right">
                  {b.source} → {b.destination}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}


