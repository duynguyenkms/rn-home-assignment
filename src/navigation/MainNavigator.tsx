import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoScreen from '@/features/todo/screens/TodoScreen';
import { MainStackParamList, Route } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Route.TodoList} component={TodoScreen} />
    </Stack.Navigator>
  );
};

export { MainNavigator };
