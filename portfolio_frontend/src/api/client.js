'use strict';

/**
 * Centralized API client for the portfolio frontend.
 * Uses CRA env var naming: REACT_APP_*.
 */

const DEFAULT_BASE_URL = 'http://localhost:3001';

/**
 * PUBLIC_INTERFACE
 * Get API base URL from env or default.
 */
export function getApiBaseUrl() {
  /** Returns the configured backend base URL for REST calls. */
  return (process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, '');
}

/**
 * PUBLIC_INTERFACE
 * Fetch JSON with a consistent error shape.
 */
export async function fetchJson(path, options = {}) {
  /** Performs fetch and returns parsed JSON or throws a normalized Error. */
  const url = `${getApiBaseUrl()}${path.startsWith('/') ? '' : '/'}${path}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (e) {
    json = null;
  }

  if (!res.ok) {
    const message =
      (json && (json.message || json.error)) ||
      `Request failed with status ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = json;
    throw err;
  }

  return json;
}
