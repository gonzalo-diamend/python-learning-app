import { mockFetchJson, mockPostJson } from "./mock-api";

export type SessionResponse = {
  authenticated: boolean;
  user_id?: string;
};

const getApiBase = () => process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
const useMockApi = () => process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (useMockApi()) {
    if (!init || init.method === "GET") {
      return mockFetchJson<T>(path);
    }
    return mockPostJson<T>(path, init.body ? JSON.parse(String(init.body)) : {});
  }

  const res = await fetch(`${getApiBase()}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Auth request failed: ${path} (${res.status})`);
  }

  return res.json() as Promise<T>;
};

export const fetchSession = () => request<SessionResponse>("/auth/session");

export const login = (userId: string, password: string) =>
  request<SessionResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ user_id: userId, password }),
  });

export const logout = () => request<{ ok: boolean }>("/auth/logout", { method: "POST", body: JSON.stringify({}) });
