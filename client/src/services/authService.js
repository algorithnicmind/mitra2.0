import api from './api';

/**
 * Auth Service — handles all authentication-related API calls
 */

// Register a new user
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login user
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Get current user profile
export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Update user profile
export const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData);
  return response.data;
};

// Change password
export const changePassword = async (passwordData) => {
  const response = await api.put('/auth/password', passwordData);
  return response.data;
};
