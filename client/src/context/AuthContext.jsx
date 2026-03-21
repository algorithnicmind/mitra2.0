/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getMe } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('mitra_token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // On mount, check if user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const data = await getMe();
          setUser(data.user);
        } catch {
          // Token is invalid or expired
          localStorage.removeItem('mitra_token');
          localStorage.removeItem('mitra_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Login
  const login = async (email, password) => {
    setError(null);
    try {
      const data = await loginUser({ email, password });
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('mitra_token', data.token);
      localStorage.setItem('mitra_user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      const message =
        err.response?.data?.error?.message || 'Login failed. Please try again.';
      setError(message);
      throw err;
    }
  };

  // Register
  const register = async (userData) => {
    setError(null);
    try {
      const data = await registerUser(userData);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('mitra_token', data.token);
      localStorage.setItem('mitra_user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      const message =
        err.response?.data?.error?.message || 'Registration failed. Please try again.';
      setError(message);
      throw err;
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('mitra_token');
    localStorage.removeItem('mitra_user');
  };

  // Clear error
  const clearError = () => setError(null);

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
