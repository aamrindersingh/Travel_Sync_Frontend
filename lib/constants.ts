// Application constants

export const APP_CONFIG = {
  name: 'TravelSync',
  description: 'Find your perfect travel companions and create unforgettable journeys together.',
  version: '1.0.0',
  author: 'TravelSync Team',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

// Professional Neon Design Tokens
export const NEON_COLORS = {
  accent: '#00E4FF',
  accent2: '#7CFFEA',
  accentSoft: 'rgba(0, 228, 255, 0.06)',
  accentGlow: 'rgba(0, 228, 255, 0.12)',
} as const;

export const DARK_THEME = {
  primary: '#0B0F12',
  secondary: '#0F1720',
  tertiary: '#13161A',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  retries: 3,
} as const;

export const AUTH_CONFIG = {
  tokenKey: 'authToken',
  refreshTokenKey: 'refreshToken',
  tokenExpiryKey: 'tokenExpiry',
  cookieName: 'travelsync-auth',
  cookieMaxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

export const PAGINATION = {
  defaultPageSize: 10,
  maxPageSize: 100,
  defaultPage: 1,
} as const;

export const MATCHING = {
  minScore: 0.6,
  maxResults: 50,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
} as const;

export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  },
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Name must be 2-50 characters and contain only letters and spaces',
  },
} as const;

export const BUDGET_RANGES = [
  { value: 'low', label: '$0 - $500', min: 0, max: 500 },
  { value: 'medium', label: '$500 - $1500', min: 500, max: 1500 },
  { value: 'high', label: '$1500+', min: 1500, max: Infinity },
] as const;

export const GROUP_SIZES = [
  { value: '1', label: 'Solo' },
  { value: '2', label: '2 people' },
  { value: '3-5', label: '3-5 people' },
  { value: '6+', label: '6+ people' },
] as const;

export const INTERESTS = [
  'Adventure',
  'Culture',
  'Food',
  'History',
  'Nature',
  'Nightlife',
  'Photography',
  'Relaxation',
  'Shopping',
  'Sports',
  'Wildlife',
  'Art',
  'Music',
  'Architecture',
  'Beaches',
  'Mountains',
  'Cities',
  'Rural',
] as const;

export const TICKET_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const MATCH_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CONNECTED: 'connected',
} as const;

export const NOTIFICATION_TYPES = {
  MATCH_FOUND: 'match_found',
  CONNECTION_REQUEST: 'connection_request',
  CONNECTION_ACCEPTED: 'connection_accepted',
  MESSAGE_RECEIVED: 'message_received',
  TICKET_UPDATED: 'ticket_updated',
} as const;

export const CACHE_KEYS = {
  TICKETS: 'tickets',
  MATCHES: 'matches',
  USER: 'user',
  PREFERENCES: 'preferences',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  TICKET_CREATED: 'Ticket created successfully!',
  TICKET_UPDATED: 'Ticket updated successfully!',
  TICKET_DELETED: 'Ticket deleted successfully!',
  CONNECTION_SENT: 'Connection request sent!',
  CONNECTION_ACCEPTED: 'Connection accepted!',
  PROFILE_UPDATED: 'Profile updated successfully!',
} as const;
