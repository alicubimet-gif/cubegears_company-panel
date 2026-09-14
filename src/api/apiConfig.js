export const USE_MOCK_API = String(import.meta.env.VITE_USE_MOCK_API ?? 'true') === 'true';

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
