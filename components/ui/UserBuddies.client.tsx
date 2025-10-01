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
}

const DUMMY_BUDDIES: BuddyCardProps[] = [
  { id: "1", name: "Alex Carter", batch: "ECE '27", time: "09:15 AM", source: "Hostel A", destination: "Airport" },
  { id: "2", name: "Maya Singh", batch: "CSE '26", time: "10:00 AM", source: "Hostel B", destination: "Railway" },
  { id: "3", name: "Ravi Kumar", batch: "ME '25", time: "11:30 AM", source: "Uniworld-1", destination: "Terminal-2" },
  { id: "4", name: "Sara Lee", batch: "IT '27", time: "12:45 PM", source: "KSR Train", destination: "Terminal-1" },
];

export default function UserBuddies({ buddies }: { buddies?: BuddyCardProps[] }) {
  return (
    <div className="user-buddies-row">
      {(buddies && buddies.length > 0 ? buddies : DUMMY_BUDDIES).map((b) => (
        <Link
          key={b.id}
          href={`https://wa.me/${(b.phone_number || '').replace(/\D/g, '') || '0000000000'}`}
          className="user-card"
          target="_blank"
        >
          <div className="user-avatar" />
          <div className="user-meta">
            <div className="user-name">{b.name}</div>
            <div className="user-batch">{b.batch}</div>
          </div>
          <div className="user-info">
            <div className="user-time">{b.time}</div>
            <div className="user-route">{b.source} → {b.destination}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}


