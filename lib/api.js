"use client";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export { CATEGORIES, formatDate } from "./constants";

async function getToken() {
  try {
    const res = await fetch("/api/auth/token", {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.token || null;
  } catch {
    return null;
  }
}

export async function apiFetch(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = await getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data;
}
