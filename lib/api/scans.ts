import { apiClient } from "./client";

export const scansApi = {
  getTrends: async () => {
    return apiClient<any>('/scans/trends', { requireAuth: true });
  },
  
  triggerScan: async (url: string) => {
    return apiClient<any>('/scan', { 
        method: 'POST', 
        body: JSON.stringify({ url }), 
        requireAuth: true
    });
  },

  getScans: async () => {
    return apiClient<any>('/scans', { requireAuth: true });
  },

  getScanDetails: async (id: string) => {
    return apiClient<any>(`/scans/${id}`, { requireAuth: true });
  },

  compareScans: async (baseScanId: string, targetScanId: string) => {
    return apiClient<any>(`/scans/compare?base=${baseScanId}&target=${targetScanId}`, { requireAuth: true });
  }
};
