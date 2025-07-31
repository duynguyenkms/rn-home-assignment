import React from 'react';
import { useAuthStore } from '@/store';
import { MainNavigator } from './MainNavigator';
import { AuthNavigator } from './AuthNavigator';

const RootNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

export { RootNavigator };
