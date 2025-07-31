import { AppRegistry, Platform } from 'react-native';
import { name as appName } from './app.json';
import App from '@/App';

// Passing value to ignore `EXPO_OS` undefined warning because we do not use expo CLI
process.env.EXPO_OS = Platform.OS;

AppRegistry.registerComponent(appName, () => App);
