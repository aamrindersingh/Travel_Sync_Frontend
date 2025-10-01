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
  async createTravel(payload: {
    source: string;
    destination: string;
    departure_at: string; // ISO string
    time_diff_mins: number;
    empty_seats: number;
    phone_number: string;
  }) {
    const res = await this.client.post('/api/travel', payload);
    return res.data;
  }
  async getTravels() {
    const res = await this.client.get('/api/travel');
    return res.data;
  }

  async getMyTravels() {
    const res = await this.client.get('/api/travel/my');
    return res.data;
  }

  async getTravel(id: string | number) {
    const res = await this.client.get(`/api/travel/${id}`);
    return res.data;
  }

  async updateTravel(id: string | number, payload: {
    source?: string;
    destination?: string;
    departure_at?: string; // ISO string
    time_diff_mins?: number;
    empty_seats?: number;
    phone_number?: string;
    status?: 'open' | 'closed' | string;
  }) {
    const res = await this.client.put(`/api/travel/${id}`, payload);
    return res.data;
  }

  async deleteTravel(id: string | number) {
    const res = await this.client.delete(`/api/travel/${id}`);
    return res.data;
  }

  // Matches
  async getRecommendations(ticketId: string | number) {
    const res = await this.client.get(`/api/travel/${ticketId}/recommendations`);
    return res.data;
  }

  // Current user's tickets/responses
  async getUserTravelResponses() {
    const res = await this.client.get('/api/travel/user-responses');
    return res.data;
  }

  // User endpoints
  async getUser(userId: string | number) {
    const res = await this.client.get(`/api/user/${userId}`);
    return res.data;
  }
  async updateUser(userId: string | number, payload: { name?: string; phone_number?: string }) {
    const res = await this.client.put(`/api/user/${userId}`, payload);
    return res.data;
  }
}

const api = new ApiClient(API_BASE_URL);
export default api;
