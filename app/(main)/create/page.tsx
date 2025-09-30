// client
"use client";

import { useEffect, useState } from "react";
import ClientCreateForm from "./client-create-form";

export default function CreatePage() {
  // TODO: Client-first (CSR) - form with client validation
  // TODO: Optimistic UI for better UX
  // TODO: Redirect to /ticket/[newId] after submit

  const [playIntro, setPlayIntro] = useState(false);

  useEffect(() => {
    try {
      const key = "travelsync_create_intro_seen";
      const seen = typeof window !== "undefined" ? window.localStorage.getItem(key) : "1";
      if (!seen) {
        setPlayIntro(true);
        window.localStorage.setItem(key, "1");
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[var(--neon-accent)]/20 to-[var(--neon-accent-2)]/20 border border-[var(--neon-accent)]/30 mb-6 ${playIntro ? "plus-intro" : ""}`}>
            <svg className="w-8 h-8 text-[var(--neon-accent)] plus-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
            Create Your <span className="neon-text animate-pulse">Travel Ticket</span>
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl font-light text-white/90 mb-4 leading-relaxed">
              🚀 <span className="font-semibold">Launch your journey</span> and discover amazing travel companions
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              Connect with like-minded travelers, share costs, and create unforgettable memories together. 
              <span className="text-[var(--neon-accent)] font-medium"> Your next adventure starts here.</span>
            </p>
          </div>
        </div>

        <div className="frosted-card max-w-2xl mx-auto">
          <ClientCreateForm />
        </div>

      </div>
    </div>
  );
}
