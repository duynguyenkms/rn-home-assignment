import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@/store', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('@/navigation/MainNavigator', () => {
  const { Text } = require('react-native');
  return { MainNavigator: () => <Text>Main Screen</Text> };
});

jest.mock('@/navigation/AuthNavigator', () => {
  const { Text } = require('react-native');
  return { AuthNavigator: () => <Text>Auth Screen</Text> };
});

import { useAuthStore } from '@/store';
import { RootNavigator } from '@/navigation/RootNavigator';

describe('RootNavigator', () => {
  it('renders MainNavigator when authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(true);

    const { getByText } = render(<RootNavigator />);

    expect(getByText('Main Screen')).toBeTruthy();
  });

  it('renders AuthNavigator when not authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(false);

    const { getByText } = render(<RootNavigator />);

    expect(getByText('Auth Screen')).toBeTruthy();
  });
});
