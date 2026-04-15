export interface ScanIssue {
  issue: string;
  severity?: string;
  contextual_severity?: string;
  layer: string;
  explanation?: string;
  remediation_snippet?: string;
  fix?: string;
}

export interface LayerStatus {
  status: 'green' | 'yellow' | 'red';
  message?: string;
}

export interface ScanResponse {
  id: string;
  url: string;
  security_score: number;
  layers: Record<string, string | LayerStatus>;
  issues: ScanIssue[];
  created_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface DashboardTrendsResponse {
  trends: any; // Add more specific typing when implementing
  total_scans: number;
  average_score: number;
  latest_risk?: string;
}

export interface ScanHistoryItem {
  id: string;
  url: string;
  security_score: number;
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface ChatResponse {
  reply: string;
}

export interface ThreatNarrativeResponse {
  narrative: string;
}

export interface ScanDiffResponse {
  old_score: number;
  new_score: number;
  resolved: ScanIssue[];
  new: ScanIssue[];
  persisting: ScanIssue[];
}

export interface ApiKey {
  id: string;
  key_hint: string;
  created_at: string;
  expires_at?: string;
}
