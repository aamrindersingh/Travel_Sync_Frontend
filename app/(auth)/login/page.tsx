// server
'use client';

import ClientLogin from './client-login';
import { Suspense } from 'react';

export default function LoginPage() {
  // TODO: Check auth cookie and redirect if already authenticated
  // TODO: Server-side redirect logic
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to TravelSync
          </h2>
        </div>
        <Suspense fallback={<div className="text-gray-600">Loading…</div>}> 
          <ClientLogin />
        </Suspense>
      </div>
    </div>
  );
}
