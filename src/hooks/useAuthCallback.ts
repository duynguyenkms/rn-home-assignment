import { useAuthStore } from '@/store';

export const useAuthCallback = (fn: () => void) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return () => {
    if (isAuthenticated) {
      fn();
    }
  };
};
