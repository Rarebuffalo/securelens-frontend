import { apiClient } from "./client";

export const scansApi = {
  getTrends: async () => {
    return apiClient<any>('/scans/trends', { requireAuth: true });
  },
  
  // Stubs for future features that we will implement next
  triggerScan: async (url: string) => {
    return apiClient<any>('/scan', { 
        method: 'POST', 
        body: JSON.stringify({ url }), 
        requireAuth: true // or false depending on anonymous vs logged in, we are assuming logged in here.
    });
  },

  getScans: async () => {
    return apiClient<any>('/scans', { requireAuth: true });
  },

  getScanDetails: async (id: string) => {
    return apiClient<any>(`/scans/${id}`, { requireAuth: true });
  }
};
