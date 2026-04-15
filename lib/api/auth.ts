import { apiClient } from "./client";

export const authApi = {
  login: async (credentials: Record<string, string>) => {
    return apiClient<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      requireAuth: false,
    });
  },

  register: async (data: Record<string, string>) => {
    return apiClient<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: false,
    });
  },

  getMe: async () => {
    return apiClient<any>('/auth/me', {
      method: 'GET',
      requireAuth: true,
    });
  },
};
