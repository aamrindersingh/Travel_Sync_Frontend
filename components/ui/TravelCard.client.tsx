'use client';

import React from 'react';
import clsx from 'clsx';

type TravelCardProps = {
  name: string;
  subtitle?: string;
  email?: string;
  avatarUrl?: string;
  initials?: string;
  from: string;
  to: string;
  dateText?: string;
  timeText?: string;
  score?: number;
  whatsappLink?: string; // e.g. https://wa.me/xxxxxxxxxx?text=Hello
  className?: string;
};

function FallbackInitials({ name, initials }: { name?: string; initials?: string }) {
  const text = React.useMemo(() => {
    if (initials && initials.trim().length > 0) return initials.trim().slice(0, 2).toUpperCase();
    const parts = String(name || '')
      .trim()
      .split(' ')
      .filter(Boolean);
    const firstTwo = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '');
    const joined = firstTwo.join('');
    return joined || 'U';
  }, [name, initials]);
  return <span>{text}</span>;
}

// Minimal inline icons to avoid extra deps
const Icon = {
  MapPin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Calendar: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  WhatsApp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.53 0 .23 5.3.23 11.82c0 2.09.55 4.12 1.6 5.92L0 24l6.45-1.77a11.8 11.8 0 0 0 5.6 1.43h.01c6.51 0 11.81-5.3 11.81-11.82 0-3.15-1.23-6.1-3.36-8.36zM12.06 21.3h-.01c-1.8 0-3.56-.49-5.09-1.42l-.36-.22-3.83 1.05 1.02-3.73-.24-.38a9.31 9.31 0 0 1-1.43-4.89c0-5.16 4.21-9.37 9.38-9.37 2.51 0 4.86.98 6.63 2.76a9.29 9.29 0 0 1 2.75 6.62c0 5.16-4.21 9.38-9.38 9.38zm5.17-7.03c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.62.14-.19.28-.72.9-.88 1.09-.16.19-.32.21-.6.07-.28-.14-1.19-.44-2.26-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.19-.28.28-.47.09-.19.05-.35-.03-.5-.09-.14-.62-1.49-.86-2.05-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.49.07-.75.35-.26.28-1 1-1 2.43 0 1.44 1.03 2.84 1.17 3.03.14.19 2.02 3.08 4.9 4.29.69.3 1.23.48 1.66.61.69.22 1.31.19 1.8.12.55-.08 1.64-.67 1.88-1.33.23-.66.23-1.2.16-1.33-.07-.14-.26-.21-.54-.35z" />
    </svg>
  ),
  Star: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
};

export default function TravelCard({
  name,
  subtitle,
  email,
  avatarUrl,
  initials,
  from,
  to,
  dateText,
  timeText,
  score,
  whatsappLink,
  className = '',
}: TravelCardProps) {
  return (
    <article
      className={clsx(
        'group relative w-full max-w-xl rounded-2xl bg-black border border-gray-800 shadow-lg shadow-black/60 overflow-hidden',
        'p-4 sm:p-4 md:p-6',
        'transition-all duration-300',
        'hover:scale-[1.01] hover:border-cyan-400/40 hover:shadow-[0_0_28px_rgba(0,228,255,0.20)]',
        className,
      )}
    >
      {/* Subtle neon gradient sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"
        style={{
          background:
            'radial-gradient(60% 60% at 100% 0%, rgba(0,228,255,0.06) 0%, rgba(0,0,0,0) 60%), radial-gradient(50% 50% at 0% 100%, rgba(244,63,94,0.06) 0%, rgba(0,0,0,0) 60%)',
        }}
      />

      {/* Score badge (top right) */}
      {typeof score === 'number' ? (
        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] text-amber-300 inline-flex items-center gap-1.5">
          <Icon.Star className="w-3.5 h-3.5" />
          <span className="tabular-nums">{score.toFixed(2)}</span>
        </div>
      ) : null}
      {/* Header */}
      <header className="relative z-10 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full ring-1 ring-gray-900 bg-gray-900 overflow-hidden flex items-center justify-center text-white font-semibold">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <FallbackInitials name={name} initials={initials} />
          )}
        </div>
        <div className="min-w-0">
          <div className="text-lg font-semibold text-white">{name}</div>
          {subtitle ? <div className="text-sm text-gray-400 mt-1">{subtitle}</div> : null}
          {email ? <div className="text-sm text-gray-400 mt-1 truncate">{email}</div> : null}
        </div>
      </header>

      {/* Info rows */}
      <div className="relative z-10 mt-5 space-y-3">
        {/* Route row */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center rounded-md bg-[#0b0b0b]">
            <Icon.MapPin className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="min-w-0 text-sm text-white break-words">{from}</div>
              <div className="flex-1 h-px bg-gray-800 relative">
                <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-gray-700" />
                <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-gray-700" />
              </div>
              <div className="min-w-0 text-sm text-white break-words text-right">{to}</div>
            </div>
          </div>
        </div>

        {/* Calendar row (optional) */}
        {dateText || timeText ? (
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-md bg-[#0b0b0b]">
              <Icon.Calendar className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm text-white">
              <span>{dateText}</span>
              {dateText && timeText ? <span className="text-gray-500 mx-2">·</span> : null}
              {timeText ? <span>{timeText}</span> : null}
            </div>
          </div>
        ) : null}
      </div>

      {/* Divider */}
      <div className="relative z-10 my-3 border-t border-gray-800" aria-hidden="true" />

      {/* WhatsApp CTA */}
      <a
        href={(() => {
          const raw = String(whatsappLink || '').trim();
          if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
          const digits = raw.replace(/[^0-9]/g, '');
          if (digits) return `https://wa.me/${digits}`;
          const text = encodeURIComponent(`Hello ${name}`);
          return `https://wa.me/?text=${text}`;
        })()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Connect with ${name} on WhatsApp`}
        className={clsx(
          'relative z-20 mt-4 inline-flex items-center justify-center gap-3 w-full py-3 rounded-xl',
          'border border-gray-700 bg-gray-900/70 backdrop-blur-sm text-white text-sm font-medium',
          'hover:border-green-400 hover:text-green-400',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400',
          'cursor-pointer',
          'transition-colors'
        )}
      >
        <Icon.WhatsApp className="w-5 h-5 text-green-400" />
        <span>Connect on WhatsApp</span>
      </a>
    </article>
  );
}


