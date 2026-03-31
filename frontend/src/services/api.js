import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

// User APIs
export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  getByRole: (role) => api.get(`/users/role/${role}`),
  getActiveWorkers: () => api.get('/users/workers/active'),
  toggleStatus: (id) => api.patch(`/users/${id}/toggle-status`),
  delete: (id) => api.delete(`/users/${id}`),
};

// Waste Request APIs
export const requestAPI = {
  create: (data) => api.post('/requests', data),
  getAll: () => api.get('/requests'),
  getById: (id) => api.get(`/requests/${id}`),
  getByUser: (userId) => api.get(`/requests/user/${userId}`),
  search: (params) => api.get('/requests/search', { params }),
  filter: (params) => api.get('/requests/filter', { params }),
  updateStatus: (id, params) => api.patch(`/requests/${id}/status`, null, { params }),
  delete: (id) => api.delete(`/requests/${id}`),
};

// Assignment APIs
export const assignmentAPI = {
  assign: (data) => api.post('/assignments', data),
  getWorkerTasks: (workerId) => api.get(`/assignments/worker/${workerId}`),
  updateStatus: (requestId, status) =>
    api.patch(`/assignments/request/${requestId}/status`, null, { params: { status } }),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

export default api;
