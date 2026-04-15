import { apiClient } from "./client";

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  created_at: string;
  last_used?: string;
  expires_at?: string;
}

export const keysApi = {
  getKeys: async () => {
    return apiClient<ApiKey[]>('/api-keys', { requireAuth: true });
  },
  
  createKey: async (name: string, expires_in_days?: number) => {
    return apiClient<{ key: string, api_key: ApiKey }>('/api-keys', { 
        method: 'POST', 
        body: JSON.stringify({ name, expires_in_days }), 
        requireAuth: true
    });
  },

  revokeKey: async (id: string) => {
    return apiClient<any>(`/api-keys/${id}`, { 
        method: 'DELETE',
        requireAuth: true 
    });
  }
};
