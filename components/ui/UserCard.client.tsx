'use client';

import React from 'react';

type UserCardProps = {
  initials?: string;
  name: string;
  batch?: string;
  score?: number;
  from?: string;
  to?: string;
  className?: string;
};

export default function UserCard({
  initials = 'VS',
  name,
  batch = 'Batch2024',
  score = 100,
  from = 'Bangalore Cantonment Railway Station',
  to = 'Krishnarajapuram Railway Station',
  className = '',
}: UserCardProps) {
  return (
    <div className={`neon-card text-white p-4 sm:p-5 w-full max-w-md mx-auto flex flex-col items-center justify-center ${className}`} style={{ aspectRatio: '1 / 1' }}>
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 bg-[#2563EB] text-white flex items-center justify-center font-semibold shadow-[0_0_18px_rgba(37,99,235,0.35)]">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="font-semibold text-white text-base sm:text-lg truncate max-w-[16rem]">{name}</div>
            {batch ? (
              <span className="px-2 py-0.5 rounded-md neon-pill text-[11px] text-white/90">{batch}</span>
            ) : null}
            {typeof score === 'number' ? (
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[11px] text-white/90 inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="tabular-nums">{score.toFixed(2)}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Travel */}
      <div className="mt-6 w-full flex justify-center">
        {/* Minimal horizontal route with From — line — To */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="min-w-0 text-right">
            <div className="text-[12px] text-white/60">From</div>
            <div className="font-semibold text-white truncate max-w-[12rem] sm:max-w-[14rem]">{from}</div>
          </div>
          <div className="w-28 sm:w-40 h-px bg-white/10 relative">
            <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-white/30" />
            <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-white/30" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] text-white/60">To</div>
            <div className="font-semibold text-white truncate max-w-[12rem] sm:max-w-[14rem]">{to}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


