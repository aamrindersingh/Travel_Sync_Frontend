"use client";

export default function RainDots() {
  // minimal, low element count for performance
  const drops = Array.from({ length: 12 });
  return (
    <div className="rain-dots" aria-hidden="true">
      {drops.map((_, i) => (
        <span key={i} className={`rain-dot rain-dot-${i + 1}`} />
      ))}
    </div>
  );
}


