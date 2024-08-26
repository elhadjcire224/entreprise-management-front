import { useAuthContext } from '@/contexts/AuthProvider';

export function useUserRole() {
  const { user } = useAuthContext();

  return {
    isAdmin: user?.role === 'ADMIN',
    isValidator: user?.role === 'VALIDATOR',
  };
}
