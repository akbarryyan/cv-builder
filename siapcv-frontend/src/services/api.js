import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// CV API functions
export const cvAPI = {
  // Create new CV
  create: async (cvData) => {
    const response = await api.post("/cvs", cvData);
    return response.data;
  },

  // Get all user CVs
  getAll: async () => {
    const response = await api.get("/cvs");
    return response.data;
  },

  // Get CV by ID
  getById: async (cvId) => {
    const response = await api.get(`/cvs/${cvId}`);
    return response.data;
  },

  // Update CV
  update: async (cvId, cvData) => {
    const response = await api.put(`/cvs/${cvId}`, cvData);
    return response.data;
  },

  // Delete CV
  delete: async (cvId) => {
    const response = await api.delete(`/cvs/${cvId}`);
    return response.data;
  },
};

// Auth API functions
export const authAPI = {
  // Login
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  // Register
  register: async (firstName, lastName, email, password) => {
    const response = await api.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  },
};

export default api;
