"use client";

export default function AmbientBackground() {
  return (
    <div className="professional-gradient-bg" aria-hidden="true">
      {/* Main gradient layers */}
      <div className="gradient-layer-1" />
      <div className="gradient-layer-2" />
      <div className="gradient-layer-3" />
      
      {/* Animated orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />
      
      {/* Subtle noise texture */}
      <div className="gradient-noise" />
      
      {/* Vignette overlay */}
      <div className="gradient-vignette" />
    </div>
  );
}



