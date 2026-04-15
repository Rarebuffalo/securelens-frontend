export class APIError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "APIError";
  }
}

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

/**
 * A central wrapper around native fetch().
 * - Automatically attaches the JWT 'access_token' from localStorage if requireAuth is true.
 * - Parses JSON automatically.
 * - Throws structured APIError objects for clean error handling in the UI.
 */
export async function apiClient<T>(
  endpoint: string,
  { requireAuth = true, ...customConfig }: RequestOptions = {}
): Promise<T> {
  const headers = new Headers(customConfig.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (requireAuth) {
    const token = typeof window !== "undefined" ? localStorage.getItem("securelens_token") : null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const config: RequestInit = {
    ...customConfig,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  let data;
  try {
    data = await response.json();
  } catch {
    // some responses might be empty (204 No Content)
    data = null;
  }

  if (!response.ok) {
    throw new APIError(response.status, data?.detail || "An error occurred", data);
  }

  return data;
}
