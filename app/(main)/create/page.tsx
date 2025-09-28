// client
"use client";

import ClientCreateForm from "./client-create-form";

export default function CreatePage() {
  // TODO: Client-first (CSR) - form with client validation
  // TODO: Optimistic UI for better UX
  // TODO: Redirect to /ticket/[newId] after submit

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Create Your <span className="neon-text">Travel Ticket</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Share your travel plans and connect with fellow travelers who want
            to join your journey.
          </p>
        </div>

        <div className="frosted-card max-w-3xl mx-auto">
          <ClientCreateForm />
        </div>

        {/* Test content to force scroll */}
        <div className="mt-20 space-y-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Tips for Creating a Great Travel Ticket
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="frosted-card">
              <h3 className="text-lg font-semibold text-white mb-3">
                Be Specific
              </h3>
              <p className="text-white/70">
                Include exact locations and times to help others find you
                easily.
              </p>
            </div>
            <div className="frosted-card">
              <h3 className="text-lg font-semibold text-white mb-3">
                Stay Safe
              </h3>
              <p className="text-white/70">
                Meet in public places and share your travel plans with friends.
              </p>
            </div>
            <div className="frosted-card">
              <h3 className="text-lg font-semibold text-white mb-3">
                Be Responsive
              </h3>
              <p className="text-white/70">
                Check your messages regularly and confirm your travel plans.
              </p>
            </div>
          </div>
          <div className="py-20">
            <p className="text-white/50">More content to test scrolling...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
