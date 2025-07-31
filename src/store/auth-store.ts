import { create } from 'zustand';
import { localAuthService, LocalAuthResult } from '@/services';

interface AuthStore {
  isAuthenticated: boolean;
  loading: boolean;
  authenticate: () => Promise<LocalAuthResult>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: false,
  loading: false,
  authenticate: async () => {
    set({ loading: true });

    const result = await localAuthService.authenticate();

    set({ isAuthenticated: result.status === 'success', loading: false });

    return result;
  },
  logout: () => {
    set({ isAuthenticated: false });
  },
}));
