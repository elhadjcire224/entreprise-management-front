import api from '@/lib/api';
import { useCallback, useEffect, useState } from 'react';

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

interface Token {
  type: 'bearer';
  name: string | null;
  token: string;
  abilities: string[];
  lastUsedAt: string | null;
  expiresAt: string;
}

interface AuthState {
  user: User | null;
  token: Token | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthError {
  message: string;
  errors?: { [key: string]: string[] };
}

const LOCAL_STORAGE_KEY = 'auth_state';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState) as AuthState;
        if (parsedState.token) {
          const expiresAt = new Date(parsedState.token.expiresAt).getTime();
          if (expiresAt > Date.now()) {
            return parsedState;
          }
        }
      } catch (error) {
        console.error('Error parsing stored auth state:', error);
      }
    }
    return { user: null, token: null };
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    if (authState.token) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authState));
      api.defaults.headers.common['Authorization'] = `Bearer ${authState.token.token}`;
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      delete api.defaults.headers.common['Authorization'];
    }
  }, [authState]);

  const handleApiError = (error: any): AuthError => {
    if (error.response && error.response.data) {
      return {
        message: error.response.data.message || 'Une erreur est survenue',
        errors: error.response.data.errors,
      };
    }
    return { message: 'Une erreur de réseau est survenue' };
  };

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      setAuthState({
        user: response.data.admin,
        token: response.data.token,
      });
      return response.data;
    } catch (err) {
      setError(handleApiError(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async ({ name, email, password }: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', { name, email, password });
      setAuthState({
        user: response.data.admin,
        token: response.data.token,
      });
      return response.data;
    } catch (err) {
      setError(handleApiError(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Erreur lors de la déconnexion', err);
    } finally {
      setAuthState({ user: null, token: null });
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

export default useAuth;
