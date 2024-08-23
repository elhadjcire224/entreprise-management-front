import { useCallback, useEffect, useState } from 'react';
import api from '../lib/api';

enum Roles {
  ADMIN = 'ADMIN',
  VALIDATOR = 'VALIDATOR',
}

export default Roles

interface User {
  id: string;
  name: string;
  email: string;
  role: Roles
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    return {
      user: userString ? JSON.parse(userString) : null,
      token,
    };
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authState.token) {
      localStorage.setItem('token', authState.token);
    } else {
      localStorage.removeItem('token');
    }
    if (authState.user) {
      localStorage.setItem('user', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [authState]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/login', { email, password });
      setAuthState({
        user: response.data.user,
        token: response.data.token,
      });
    } catch (err) {
      setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await api.post('/logout');
    } catch (err) {
      console.error('Erreur lors de la déconnexion', err);
    } finally {
      setAuthState({ user: null, token: null });
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/register', { email, password });
      setAuthState({
        user: response.data.user,
        token: response.data.token,
      });
    } catch (err) {
      setError('Échec de l\'inscription. Veuillez réessayer.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user: authState.user,
    token: authState.token,
    isAuthenticated: !!authState.token,
    login,
    logout,
    register,
    isLoading,
    error,
  };
};
