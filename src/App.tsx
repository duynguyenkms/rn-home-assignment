import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { RootNavigator } from '@/navigation';
import { PortalProvider } from '@/components';

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PortalProvider>
        <SafeAreaProvider>
          <MenuProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </MenuProvider>
        </SafeAreaProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
