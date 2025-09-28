// helper for route generation

export const routes = {
  home: '/home',
  login: '/login',
  tickets: '/ticket',
  create: '/create',
  find: '/find',
} as const;

export const ticketUrl = (id: string) => `/ticket/${id}`;

export const matchUrl = (ticketId: string, matchId: string) => `/ticket/${ticketId}/matches/${matchId}`;

export const profileUrl = (userId: string) => `/profile/${userId}`;

export const settingsUrl = '/settings';

export const aboutUrl = '/about';

export const contactUrl = '/contact';

export const privacyUrl = '/privacy';

export const termsUrl = '/terms';

// API endpoints
export const apiUrls = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    user: '/auth/user',
    refresh: '/auth/refresh',
  },
  tickets: {
    list: '/tickets',
    create: '/tickets',
    get: (id: string) => `/tickets/${id}`,
    update: (id: string) => `/tickets/${id}`,
    delete: (id: string) => `/tickets/${id}`,
    matches: (id: string) => `/tickets/${id}/matches`,
    bestMatches: (id: string) => `/tickets/${id}/matches/best`,
    bestGroups: (id: string) => `/tickets/${id}/matches/groups`,
    alternatives: (id: string) => `/tickets/${id}/matches/alternatives`,
    connect: (id: string) => `/tickets/${id}/connect`,
    join: (id: string) => `/tickets/${id}/join`,
  },
  users: {
    profile: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    preferences: (id: string) => `/users/${id}/preferences`,
  },
  matches: {
    list: '/matches',
    get: (id: string) => `/matches/${id}`,
    accept: (id: string) => `/matches/${id}/accept`,
    reject: (id: string) => `/matches/${id}/reject`,
  },
} as const;

// External URLs
export const externalUrls = {
  whatsapp: (phone: string, message: string) => 
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
  email: (email: string, subject: string, body: string) => 
    `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  support: 'mailto:support@travelsync.com',
  feedback: 'mailto:feedback@travelsync.com',
} as const;
