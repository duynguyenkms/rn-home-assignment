import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from './types';

export const useMainNavigation = () => useNavigation<MainNavigationProp>();
