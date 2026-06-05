// src/lib/api/client.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://upbeat-smile-production.up.railway.app/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

class ApiClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: { ...this.getHeaders(), ...options.headers },
    });

    const json = await res.json() as ApiResponse<T>;
    if (!res.ok) {
      throw new Error(json.message || `API error: ${res.status}`);
    }
    // Backend wraps data in `data` field when success=true
    return json.data as T;
  }

  get<T>(endpoint: string) { return this.request<T>(endpoint, { method: 'GET' }); }
  post<T>(endpoint: string, body: any) { return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }); }
  put<T>(endpoint: string, body: any) { return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }); }
  patch<T>(endpoint: string, body: any) { return this.request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }); }
  delete<T>(endpoint: string) { return this.request<T>(endpoint, { method: 'DELETE' }); }
}

export const api = new ApiClient();