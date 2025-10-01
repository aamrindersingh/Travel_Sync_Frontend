// server + client helpers to call Go backend using axios
import axios, { AxiosInstance } from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      withCredentials: true, // send/receive http-only cookies
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Auth endpoints (Google OAuth + JWT in httpOnly cookie)
  async getMe() {
    const res = await this.client.get('/auth/me');
    return res.data;
  }

  beginGoogleLogin() {
    if (typeof window !== 'undefined') {
      window.location.href = `${API_BASE_URL}/auth/google/login`;
    }
  }

  async logout() {
    await this.client.post('/auth/logout');
  }

  // Ticket endpoints
  async getTickets() {
    const res = await this.client.get('/api/tickets');
    return res.data;
  }

  async getTicket(id: string) {
    const res = await this.client.get(`/api/tickets/${id}`);
    return res.data;
  }

  // Matches
  async getBestGroups(ticketId: string) {
    const res = await this.client.get(`/api/tickets/${ticketId}/matches/groups`);
    return res.data;
  }
}

const api = new ApiClient(API_BASE_URL);
export default api;
