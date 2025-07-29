import axios from 'axios'

const API_URL = '/api/auth';

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

export function setTokens({ access, refresh }) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

export function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error('No refresh token');
  const response = await axios.post(`${API_URL}/refresh`, { refresh });
  setTokens({ access: response.data.access, refresh });
  return response.data.access;
}

// Axios interceptor for auto-refresh
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;
      try {
        const newAccess = await refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
        return axios(originalRequest);
      } catch (e) {
        clearTokens();
        window.location = '/login';
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

// Axios request interceptor to add access token
axios.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}); 