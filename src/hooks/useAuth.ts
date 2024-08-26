import api from '@/lib/api';
import { useCallback, useLayoutEffect, useState } from 'react';

enum Roles {
  ADMIN = 'ADMIN',
  VALIDATOR = 'VALIDATOR',
}

interface User {
  id: number;
  name: string;
  email: string;
  role: Roles;
  createdAt: string;
  updatedAt: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, admin:user } = response.data;
      localStorage.setItem('token', token.token);
      setUser(user);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      window.location.replace('/');
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.get('/me');
        setUser(response.data);
      } catch (error) {
        console.error('Token validation error:', error);
        logout();
      }
    }
    setLoading(false);
  }, [logout]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await api.post('/auth/register', data);
      const { token, admin } = response.data;
      localStorage.setItem('token', token.token);
      setUser(admin);
      return admin;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, []);

  useLayoutEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isAdmin = user?.role === Roles.ADMIN;
    const isValidator = user?.role === Roles.VALIDATOR;
  return { user, login, logout,isAdmin,isValidator, register, loading }
}
