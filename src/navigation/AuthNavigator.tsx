import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '@/features/auth/screens/AuthScreen';
import { AuthStackParamList, Route } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Route.Auth} component={AuthScreen} />
    </Stack.Navigator>
  );
};

export { AuthNavigator };
