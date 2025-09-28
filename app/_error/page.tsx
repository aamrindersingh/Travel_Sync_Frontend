// server
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[var(--neon-accent)] to-[var(--neon-accent-2)] flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-6">
          Oops! <span className="neon-text">Something went wrong</span>
        </h1>
        
        <p className="text-xl text-white/70 mb-8 max-w-lg mx-auto">
          We&apos;re sorry, but something unexpected happened. Don&apos;t worry, our team has been notified and we&apos;re working to fix it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/home"
            className="btn-primary"
          >
            Go Home
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            Try Again
          </button>
        </div>
        
        <div className="mt-12 text-sm text-white/40">
          <p>Error Code: 500</p>
          <p className="mt-2">
            If this problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
