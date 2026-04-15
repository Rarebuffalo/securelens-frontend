import { apiClient } from "./client";

export const aiApi = {
  getThreatNarrative: async (scanId: string) => {
    return apiClient<any>(`/scans/${scanId}/threat-narrative`, { requireAuth: true });
  },

  sendChatMessage: async (scanId: string, message: string) => {
    return apiClient<any>(`/scans/${scanId}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      requireAuth: true,
    });
  }
};
