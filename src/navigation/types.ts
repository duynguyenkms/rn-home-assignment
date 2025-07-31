import { NavigationProp } from '@react-navigation/native';

export enum Route {
  Auth = 'Auth',
  TodoList = 'TodoList',
}

export type MainStackParamList = {
  [Route.TodoList]: undefined;
};

export type AuthStackParamList = {
  [Route.Auth]: undefined;
};

export type MainNavigationProp = NavigationProp<MainStackParamList>;

export type AuthNavigationProp = NavigationProp<AuthStackParamList>;
