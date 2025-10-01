"use client";

import { useEffect, useRef } from "react";

export default function TravelMap({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Animate dots along paths
    const animateDots = () => {
      const dots = svg.querySelectorAll(".travel-dot");
      dots.forEach((dot, index) => {
        const path = svg.querySelector(`#path-${index + 1}`) as SVGPathElement;
        if (path) {
          const pathLength = path.getTotalLength();

          const animate = () => {
            let progress = 0;
            const animateFrame = () => {
              progress += 0.01;
              if (progress > 1) progress = 0;

              const point = path.getPointAtLength(progress * pathLength);
              (dot as SVGElement).setAttribute("cx", point.x.toString());
              (dot as SVGElement).setAttribute("cy", point.y.toString());

              requestAnimationFrame(animateFrame);
            };
            animateFrame();
          };

          setTimeout(animate, index * 1000);
        }
      });
    };

    animateDots();
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`w-full h-full min-h-screen ${className}`}
      viewBox="0 0 800 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Definitions for gradients and filters */}
      <defs>
        {/* Neon Glow Filter */}
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Path Gradients */}
        <linearGradient id="pathGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E4FF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#7CFFEA" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="pathGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FF8E8E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFB6B6" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="pathGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#96CEB4" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#45B7D1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="pathGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD93D" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FF8E8E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Connection Paths */}
      <path
        id="path-1"
        d="M 150 100 Q 300 150 400 100"
        fill="none"
        stroke="url(#pathGradient1)"
        strokeWidth="3"
        filter="url(#neonGlow)"
        strokeDasharray="10,5"
        className="animate-pulse"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;15"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Bright static dots that animate along paths */}
      <circle
        className="travel-dot"
        cx="150"
        cy="100"
        r="4"
        fill="#7DF9FF"
        filter="url(#neonGlow)"
      />
      <circle
        className="travel-dot"
        cx="150"
        cy="300"
        r="4"
        fill="#FF8FAB"
        filter="url(#neonGlow)"
      />
      <circle
        className="travel-dot"
        cx="150"
        cy="100"
        r="4"
        fill="#7CFFEA"
        filter="url(#neonGlow)"
      />
      <circle
        className="travel-dot"
        cx="150"
        cy="300"
        r="4"
        fill="#FFE066"
        filter="url(#neonGlow)"
      />

      <path
        id="path-2"
        d="M 150 300 Q 300 250 400 100"
        fill="none"
        stroke="url(#pathGradient2)"
        strokeWidth="3"
        filter="url(#neonGlow)"
        strokeDasharray="10,5"
        className="animate-pulse"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;15"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>

      <path
        id="path-3"
        d="M 150 100 Q 300 200 400 300"
        fill="none"
        stroke="url(#pathGradient3)"
        strokeWidth="3"
        filter="url(#neonGlow)"
        strokeDasharray="10,5"
        className="animate-pulse"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;15"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      <path
        id="path-4"
        d="M 150 300 Q 300 350 400 300"
        fill="none"
        stroke="url(#pathGradient4)"
        strokeWidth="3"
        filter="url(#neonGlow)"
        strokeDasharray="10,5"
        className="animate-pulse"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;15"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Hub Circles */}
      {/* Hostel A */}
      <g>
        {/* Outer pulsing ring with color fill and solid border */}
        <circle
          cx="150"
          cy="100"
          r="30"
          fill="rgba(0, 228, 255, 0.1)"
          stroke="#00E4FF"
          strokeWidth="2"
          opacity="0.6"
        >
          <animate
            attributeName="r"
            values="30;35;30"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Inner solid circle - much smaller */}
        <circle cx="150" cy="100" r="15" fill="#00E4FF" />
        {/* Icon and destination name outside the effect */}
        <text
          x="130"
          y="60"
          textAnchor="middle"
          className="text-white font-bold text-lg"
          fill="white"
        >
          🏠 Uniworld-1
        </text>
        <text
          x="150"
          y="152"
          textAnchor="middle"
          className="text-cyan-300 text-xs"
          fill="#7DD3FC"
        >
          15 Students
        </text>
      </g>

      {/* Hostel B */}
      <g>
        {/* Outer pulsing ring with color fill and solid border */}
        <circle
          cx="150"
          cy="300"
          r="30"
          fill="rgba(255, 107, 107, 0.1)"
          stroke="#FF6B6B"
          strokeWidth="2"
          opacity="0.6"
        >
          <animate
            attributeName="r"
            values="30;35;30"
            dur="2.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Inner solid circle - much smaller */}
        <circle cx="150" cy="300" r="15" fill="#FF6B6B" />
        {/* Icon and destination name outside the effect */}
        <text
          x="130"
          y="260"
          textAnchor="middle"
          className="text-white font-bold text-lg"
          fill="white"
        >
          🏠 Uniworld-2
        </text>
        <text
          x="150"
          y="352"
          textAnchor="middle"
          className="text-pink-300 text-xs"
          fill="#F9A8D4"
        >
          12 Students
        </text>
      </g>

      {/* Airport */}
      <g>
        {/* Outer pulsing ring with color fill and solid border */}
        <circle
          cx="400"
          cy="100"
          r="30"
          fill="rgba(150, 206, 180, 0.1)"
          stroke="#96CEB4"
          strokeWidth="2"
          opacity="0.6"
        >
          <animate
            attributeName="r"
            values="30;35;30"
            dur="1.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Inner solid circle - much smaller */}
        <circle cx="400" cy="100" r="15" fill="#96CEB4" />
        {/* Icon and destination name outside the effect */}
        <text
          x="380"
          y="60"
          textAnchor="middle"
          className="text-white font-bold text-lg"
          fill="white"
        >
          ✈️ Airport
        </text>
        <text
          x="400"
          y="152"
          textAnchor="middle"
          className="text-green-300 text-xs"
          fill="#86EFAC"
        >
          8 Active Routes
        </text>
      </g>

      {/* Railway */}
      <g>
        {/* Outer pulsing ring with color fill and solid border */}
        <circle
          cx="400"
          cy="300"
          r="30"
          fill="rgba(255, 217, 61, 0.1)"
          stroke="#FFD93D"
          strokeWidth="2"
          opacity="0.6"
        >
          <animate
            attributeName="r"
            values="30;35;30"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Inner solid circle - much smaller */}
        <circle cx="400" cy="300" r="15" fill="#FFD93D" />
        {/* Icon and destination name outside the effect */}
        <text
          x="380"
          y="260"
          textAnchor="middle"
          className="text-white font-bold text-lg"
          fill="white"
        >
          🚂 Railway
        </text>
        <text
          x="400"
          y="352"
          textAnchor="middle"
          className="text-yellow-300 text-xs"
          fill="#FDE047"
        >
          6 Active Routes
        </text>
      </g>
    </svg>
  );
}
