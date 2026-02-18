import { mockFetchJson, mockPostJson } from "./mock-api";

export const getApiBase = () => process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
const getApiTimeoutMs = () => Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS ?? 10_000);

const useMockApi = () => process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export class ApiError extends Error {
  status: number;
  code?: "timeout" | "network";

  constructor(message: string, status: number, code?: "timeout" | "network") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

const requestWithTimeout = async (path: string, init?: RequestInit): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), getApiTimeoutMs());

  try {
    return await fetch(`${getApiBase()}${path}`, {
      ...init,
      signal: controller.signal,
    });
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === "AbortError") {
      throw new ApiError("La solicitud excedió el tiempo de espera.", 0, "timeout");
    }

    const message = cause instanceof Error ? cause.message : String(cause);
    throw new ApiError(`Error de red al conectar con ${path}: ${message}`, 0, "network");
  } finally {
    clearTimeout(timeoutId);
  }
};

export const fetchJson = async <T>(path: string): Promise<T> => {
  if (useMockApi()) {
    return mockFetchJson<T>(path);
  }

  const res = await requestWithTimeout(path);

  if (!res.ok) {
    throw new ApiError(`Error al cargar ${path}`, res.status);
  }
  return res.json() as Promise<T>;
};

export const postJson = async <T>(path: string, body: unknown): Promise<T> => {
  if (useMockApi()) {
    return mockPostJson<T>(path, body);
  }

  const res = await requestWithTimeout(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new ApiError(`Error al enviar ${path}`, res.status);
  }

  return res.json() as Promise<T>;
};
