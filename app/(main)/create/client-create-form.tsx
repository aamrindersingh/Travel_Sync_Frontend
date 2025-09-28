// client
'use client';

import { useState } from 'react';

export default function ClientCreateForm() {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    date: '',
    time: '',
    transportMode: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement form validation
    // TODO: Call API to create ticket
    // TODO: Handle optimistic UI updates
    // TODO: Redirect to new ticket page
    setTimeout(() => setIsSubmitting(false), 1000); // Mock submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="source" className="block text-sm font-medium text-white mb-2">
            From (Source)
          </label>
          <input
            type="text"
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300"
            placeholder="Where are you starting from?"
            required
          />
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-white mb-2">
            To (Destination)
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300"
            placeholder="Where do you want to go?"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-white mb-2">
            Travel Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-white mb-2">
            Preferred Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="transportMode" className="block text-sm font-medium text-white mb-2">
            Transport Mode
          </label>
          <select
            id="transportMode"
            name="transportMode"
            value={formData.transportMode}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300"
            required
          >
            <option value="">Select transport mode</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="flight">Flight</option>
            <option value="car">Car (Ride Share)</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
            Contact Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300"
            placeholder="Your WhatsApp number"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-white mb-2">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 resize-none"
          placeholder="Tell us more about your travel plans, preferences, or any special requirements..."
        />
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Creating Ticket...</span>
            </span>
          ) : (
            'Create Travel Ticket'
          )}
        </button>
      </div>
    </form>
  );
}
