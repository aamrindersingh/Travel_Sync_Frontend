// server + client helpers to call Go backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

interface ApiError {
  message: string;
  status: number;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    // TODO: Add auth token to headers if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        data,
        success: true,
      };
    } catch (error) {
      console.error('API request failed:', error);
      throw {
        message: error instanceof Error ? error.message : 'Unknown error',
        status: 500,
      } as ApiError;
    }
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getUser() {
    return this.request('/auth/user');
  }

  // Ticket endpoints
  async getTickets() {
    return this.request('/tickets');
  }

  async getTicket(id: string) {
    return this.request(`/tickets/${id}`);
  }

  async createTicket(ticket: Record<string, unknown>) {
    return this.request('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  }

  async updateTicket(id: string, ticket: Record<string, unknown>) {
    return this.request(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticket),
    });
  }

  async deleteTicket(id: string) {
    return this.request(`/tickets/${id}`, {
      method: 'DELETE',
    });
  }

  // Match endpoints
  async getMatches(ticketId: string) {
    return this.request(`/tickets/${ticketId}/matches`);
  }

  async getBestMatches(ticketId: string) {
    return this.request(`/tickets/${ticketId}/matches/best`);
  }

  async getBestGroups(ticketId: string) {
    return this.request(`/tickets/${ticketId}/matches/groups`);
  }

  async getAlternatives(ticketId: string) {
    return this.request(`/tickets/${ticketId}/matches/alternatives`);
  }

  // Connection endpoints
  async connectWithUser(ticketId: string, userId: string) {
    return this.request(`/tickets/${ticketId}/connect`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async requestToJoin(ticketId: string) {
    return this.request(`/tickets/${ticketId}/join`, {
      method: 'POST',
    });
  }
}

// Create API client instance
const api = new ApiClient(API_BASE_URL);

// Server-side API helpers (for use in server components)
export const serverApi = {
  async getTickets(cache: RequestCache = 'no-store') {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      cache,
      headers: {
        'Content-Type': 'application/json',
        // TODO: Add server-side auth headers
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }
    
    return response.json();
  },

  async getTicket(id: string, cache: RequestCache = 'no-store') {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      cache,
      headers: {
        'Content-Type': 'application/json',
        // TODO: Add server-side auth headers
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch ticket');
    }
    
    return response.json();
  },

  async getMatches(ticketId: string, cache: RequestCache = 'no-store') {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/matches`, {
      cache,
      headers: {
        'Content-Type': 'application/json',
        // TODO: Add server-side auth headers
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    
    return response.json();
  },
};

export default api;
