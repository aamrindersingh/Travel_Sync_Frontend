// client
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--neon-accent)] to-[var(--neon-accent-2)] flex items-center justify-center animate-pulse">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Loading TravelSync</h2>
        <p className="text-white/70">Finding your perfect travel companions...</p>
      </div>
    </div>
  );
}
