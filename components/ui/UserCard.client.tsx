'use client';

import React from 'react';

type UserCardProps = {
  initials?: string;
  name: string;
  batch?: string;
  score?: number;
  time?: string; // 12h
  from?: string;
  to?: string;
  className?: string;
};

export default function UserCard({
  initials = 'VS',
  name,
  batch = 'Batch2024',
  score = 100,
  time = '03:10 PM',
  from = 'Bangalore Cantonment Railway Station',
  to = 'Krishnarajapuram Railway Station',
  className = '',
}: UserCardProps) {
  return (
    <div className={`neon-card text-white p-4 sm:p-5 ${className}`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-semibold shadow-[0_0_18px_rgba(37,99,235,0.35)]">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="font-semibold text-white text-base sm:text-lg truncate">{name}</div>
            {batch ? (
              <span className="px-2 py-0.5 rounded-md neon-pill text-[11px] text-white/90">{batch}</span>
            ) : null}
            {typeof score === 'number' ? (
              <span className="px-2.5 py-0.5 rounded-md neon-score text-[11px] text-[#F59E0B] inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {score.toFixed(2)}
              </span>
            ) : null}
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-white/80 text-[13px]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[var(--neon-accent)] font-semibold">{time}</span>
          </div>
        </div>
      </div>

      {/* Travel */}
      <div className="mt-4">
        {/* Structured From/To with vertical rail */}
        <div className="grid grid-cols-[1rem_auto_auto] gap-x-3 items-start">
          {/* From */}
          <div className="flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-md bg-[var(--neon-accent)] shadow-[0_0_12px_rgba(255,107,53,0.45)]" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] text-white/60">From</div>
            <div className="font-semibold text-white leading-snug break-words">{from}</div>
          </div>
          <div className="text-right">
            <div className="text-[12px] text-white/60">Time</div>
            <div className="text-[var(--neon-accent)] font-semibold">{time}</div>
          </div>

          {/* Rail */}
          <div className="flex items-stretch justify-center">
            <div className="route-rail" style={{ height: 26 }} />
          </div>
          <div />
          <div />

          {/* To */}
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z"/></svg>
          </div>
          <div className="min-w-0">
            <div className="text-[12px] text-white/60">To</div>
            <div className="font-semibold text-white leading-snug break-words">{to}</div>
          </div>
          <div className="text-right">
            <div className="text-[12px] text-white/60">Arrival</div>
          </div>
        </div>
      </div>
    </div>
  );
}


