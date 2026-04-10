const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = {
  signal?: AbortSignal;
  headers?: Record<string, string>;
};

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;

  const headers: Record<string, string> = { ...options.headers };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    method,
    credentials: "include",
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: options.signal,
  });

  if (!res.ok) {
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      /* empty */
    }
    const message =
      (data as Record<string, string> | undefined)?.error ??
      (data as Record<string, string> | undefined)?.message ??
      `HTTP ${res.status}`;
    throw new ApiError(res.status, message, data);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

const api = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, undefined, options),
  post: <T>(path: string, body: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),
  put: <T>(path: string, body: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, body, options),
  delete: <T = void>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};

export default api;
