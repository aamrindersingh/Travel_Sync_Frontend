// client
'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth.client';
import { useRef } from 'react';


// Location constants aligned with backend `constants.go`
const HOSTELS = [
  'Uniworld-1',
  'Uniworld-2',
] as const;

const AIRPORT_TERMINALS = [
  'Kempegowda International Airport Terminal-1',
  'Kempegowda International Airport Terminal-2',
] as const;

const RAILWAY_STATIONS = [
  'KSR SBC Bengaluru Junction',
  'SMVT Bengaluru railway station',
  'Krishnarajapuram Railway Station',
  'Yesvantpur Junction Railway station',
  'Banglore Cantonment Railway Station',
  'Bengaluru East Railway Station',
] as const;

export default function ClientCreateForm() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const prefilledOnce = useRef(false);
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    date: '',
    time: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeDiffMins, setTimeDiffMins] = useState(15);
  const [emptySeats, setEmptySeats] = useState(1);
  const [formError, setFormError] = useState<string | null>(null);

  // 12-hour time picker parts
  const [timeHour, setTimeHour] = useState('');
  const [timeMinute, setTimeMinute] = useState('');
  const [timeAmPm, setTimeAmPm] = useState('');

  const allLocations = useMemo(
    () => [
      ...AIRPORT_TERMINALS,
      ...RAILWAY_STATIONS,
      ...HOSTELS,
    ],
    []
  );

  const destinationOptions = useMemo(() => {
    const src = formData.source;
    if (!src) return allLocations;

    const isAirport = AIRPORT_TERMINALS.includes(src as typeof AIRPORT_TERMINALS[number]);
    const isHostel = HOSTELS.includes(src as typeof HOSTELS[number]);

    // Rule 1: If source is an airport terminal, destination should only show hostels
    if (isAirport) {
      return [...HOSTELS];
    }

    // Rule 2: If source is a hostel, destination should show airport terminals and railway stations
    if (isHostel) {
      return [...AIRPORT_TERMINALS, ...RAILWAY_STATIONS];
    }

    // Default: filter out the selected source
    return allLocations.filter((opt) => opt !== src);
  }, [formData.source, allLocations]);

  // If destination becomes invalid after changing source rules, reset it
  useEffect(() => {
    if (formData.destination && !destinationOptions.includes(formData.destination)) {
      setFormData((prev) => ({ ...prev, destination: '' }));
    }
  }, [destinationOptions, formData.destination]);

  // Prefill WhatsApp number from user profile
  useEffect(() => {
    const prefillPhone = async () => {
      try {
        // get current user id
        const me = await api.getMe();
        console.log('[create] /auth/me response:', me);
        const userId = me?.user_id || me?.id;
        if (!userId) return;
        // fetch full user details
        const details = await api.getUser(userId);
        console.log('[create] /api/user/:id response:', details);
        const phone =
          // backend may return camel, snake or Pascal case
          details?.data?.phone_number ||
          details?.phone_number ||
          details?.data?.PhoneNumber ||
          (details?.data && (details.data as any).PhoneNumber) ||
          (details as any)?.PhoneNumber ||
          me?.phone_number;
        console.log('[create] extracted phone before parse:', phone);
        if (phone) {
          const raw = String(phone).replace(/\D/g, '');
          const ten = raw.length >= 10 ? raw.slice(-10) : raw;
          console.log('[create] parsed phone (last 10):', ten);
          if (ten && ten.length > 0) {
            setFormData((prev) => ({ ...prev, phone: ten }));
          }
        }
      } catch (err) {
        console.log('[create] prefillPhone error:', err);
      }
    };
    if (!prefilledOnce.current && !formData.phone) {
      prefilledOnce.current = true;
      prefillPhone();
    }
  }, [formData.phone]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (formData.source === formData.destination) {
      setFormError('Source and destination must be different.');
      return;
    }
    // Validate presence of required fields (including 12h time parts)
    if (!formData.source || !formData.destination || !formData.date || !timeHour || !timeMinute || !timeAmPm) {
      setFormError('Please fill all fields.');
      return;
    }
    // Build ISO departure time from date + 12h time parts
    const minute = parseInt(timeMinute, 10);
    let hour = parseInt(timeHour, 10);
    const ampm = timeAmPm;
    if (ampm === 'AM') {
      if (hour === 12) hour = 0;
    } else if (ampm === 'PM') {
      if (hour !== 12) hour = hour + 12;
    }
    const [y, m, d] = (formData.date || '').split('-').map((x) => parseInt(x, 10));
    if (!y || !m || !d || isNaN(minute) || isNaN(hour)) {
      setFormError('Please provide a valid date and time.');
      return;
    }

    const departure = new Date(y, (m - 1), d, hour, minute, 0, 0).toISOString();
    const phoneDigits = (formData.phone || '').replace(/\D/g, '').slice(0, 10);
    if (phoneDigits.length !== 10) {
      setFormError('Contact number must be exactly 10 digits.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await api.createTravel({
        source: formData.source,
        destination: formData.destination,
        departure_at: departure,
        time_diff_mins: timeDiffMins,
        empty_seats: emptySeats,
        phone_number: phoneDigits,
      });
      const createdId = result?.data?.id ?? result?.id;
      if (createdId) {
        router.push(`/tickets/${createdId}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let next = value;
    if (name === 'phone') {
      next = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData(prev => ({
      ...prev,
      [name]: next
    }));
  };

  const handleDateClick = () => {
    const dateInput = document.getElementById('date') as HTMLInputElement;
    if (dateInput) {
      dateInput.showPicker();
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {/* Neon glow background effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[var(--neon-accent)]/5 via-transparent to-[var(--neon-accent-2)]/5 rounded-3xl blur-xl opacity-30"></div>
      
      {/* Source and Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        <div className="group">
          <label htmlFor="source" className="block text-sm font-semibold text-white mb-2 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2 animate-pulse"></span>
            From (Source)
          </label>
          <div className="relative">
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full px-4 py-3 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 hover:bg-white/8 group-hover:border-white/20 focus:shadow-[0_0_20px_rgba(0,228,255,0.3)]"
              required
            >
              <option value="" disabled>Select source</option>
              {allLocations.map((opt) => (
                <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
              ))}
            </select>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--neon-accent)]/5 to-[var(--neon-accent-2)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[var(--neon-accent)]/20 to-[var(--neon-accent-2)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none"></div>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>
        </div>
        <div className="group">
          <label htmlFor="destination" className="block text-sm font-semibold text-white mb-2 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2 animate-pulse"></span>
            To (Destination)
          </label>
          <div className="relative">
            <select
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-4 py-3 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 hover:bg-white/8 group-hover:border-white/20 focus:shadow-[0_0_20px_rgba(0,228,255,0.3)]"
              required
            >
              <option value="" disabled>Select destination</option>
              {destinationOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
              ))}
            </select>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--neon-accent)]/5 to-[var(--neon-accent-2)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[var(--neon-accent)]/20 to-[var(--neon-accent-2)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none"></div>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        <div className="group">
          <label htmlFor="date" className="block text-sm font-semibold text-white mb-2 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2 animate-pulse"></span>
            Travel Date
          </label>
          <div className="relative" onClick={handleDateClick}>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 pl-12 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 hover:bg-white/8 group-hover:border-white/20 focus:shadow-[0_0_20px_rgba(0,228,255,0.3)] cursor-pointer"
              required
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--neon-accent)]/5 to-[var(--neon-accent-2)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[var(--neon-accent)]/20 to-[var(--neon-accent-2)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none"></div>
          </div>
        </div>
        <div className="group">
          <label htmlFor="time" className="block text-sm font-semibold text-white mb-2 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2 animate-pulse"></span>
            Preferred Time
          </label>
          <div className="relative grid grid-cols-3 gap-2">
            {/* Hour */}
            <div className="relative">
              <select
                aria-label="Hour"
                value={timeHour}
                onChange={(e) => setTimeHour(e.target.value)}
                className="w-full px-4 py-3 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 hover:bg-white/8"
                required
              >
                <option value="" disabled>HH</option>
                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => (
                  <option key={h} value={h} className="bg-[#0a0a0a]">{h}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
            {/* Minute */}
            <div className="relative">
              <select
                aria-label="Minute"
                value={timeMinute}
                onChange={(e) => setTimeMinute(e.target.value)}
                className="w-full px-4 py-3 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 hover:bg-white/8"
                required
              >
                <option value="" disabled>MM</option>
                {Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0')).map(m => (
                  <option key={m} value={m} className="bg-[#0a0a0a]">{m}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
            {/* AM/PM */}
            <div className="relative">
              <select
                aria-label="AM/PM"
                value={timeAmPm}
                onChange={(e) => setTimeAmPm(e.target.value)}
                className="w-full px-4 py-3 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 hover:bg-white/8"
                required
              >
                <option value="" disabled>AM/PM</option>
                <option value="AM" className="bg-[#0a0a0a]">AM</option>
                <option value="PM" className="bg-[#0a0a0a]">PM</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
            {/* removed overlapping clock icon */}
          </div>
        </div>
      </div>

      {/* Time Difference Slider */}
      <div className="relative z-10">
        <label className="block text-sm font-semibold text-white mb-2 flex items-center">
          <span className="w-2 h-2 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2 animate-pulse"></span>
          Acceptable Time Difference
          <span className="ml-2 text-[var(--neon-accent)] font-bold">{timeDiffMins} mins</span>
        </label>
        <div className="relative px-2 py-4 rounded-xl bg-white/5 border border-white/10">
          <input
            type="range"
            min={0}
            max={120}
            step={5}
            value={timeDiffMins}
            onChange={(e) => setTimeDiffMins(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--neon-accent)]"
          />
          <div className="flex justify-between text-xs text-white/60 mt-2">
            <span>0</span>
            <span>30</span>
            <span>60</span>
            <span>90</span>
            <span>120</span>
          </div>
        </div>
      </div>

      {/* Empty Seats */}
      <div className="relative z-10">
        <label className="block text-sm font-semibold text-white mb-2 flex items-center">
          <span className="w-2 h-2 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2 animate-pulse"></span>
          Empty Seats
        </label>
        <div className="relative">
          <select
            aria-label="Empty Seats"
            value={emptySeats}
            onChange={(e) => setEmptySeats(parseInt(e.target.value, 10))}
            className="w-full px-4 py-3 appearance-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all duration-300 hover:bg-white/8"
          >
            {[1,2,3,4,5,6].map((n) => (
              <option key={n} value={n} className="bg-[#0a0a0a]">{n}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
      </div>

      {/* Contact Number */}
      <div className="group relative z-10">
        <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2 flex items-center">
          <span className="w-2 h-2 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-accent-2)] rounded-full mr-2 animate-pulse"></span>
          Contact Number
        </label>
        <div className="relative">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 pl-12 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:bg-green-500/15 group-hover:border-green-400/50 focus:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            inputMode="numeric"
            autoComplete="tel"
            pattern="[0-9]{10}"
            minLength={10}
            maxLength={10}
            placeholder="Your WhatsApp number"
            required
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none"></div>
        </div>
        {formError && (
          <p className="mt-2 text-sm text-rose-300">{formError}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-8 relative z-10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{
            background: 'linear-gradient(135deg, var(--neon-accent) 0%, var(--neon-accent-2) 100%)',
            boxShadow: '0 8px 32px rgba(0, 228, 255, 0.4), 0 0 0 1px rgba(0, 228, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
          }}
        >
          {/* Animated neon glow effect */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--neon-accent)]/50 to-[var(--neon-accent-2)]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--neon-accent)]/20 to-[var(--neon-accent-2)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-3">
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating Ticket...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Travel Ticket</span>
              </>
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
