// client
'use client';

import ClientCreateForm from './client-create-form';

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
            Share your travel plans and connect with fellow travelers who want to join your journey.
          </p>
        </div>
        
        <div className="frosted-card max-w-3xl mx-auto">
          <ClientCreateForm />
        </div>
      </div>
    </div>
  );
}
