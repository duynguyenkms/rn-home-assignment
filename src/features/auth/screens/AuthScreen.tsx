import { Alert, Linking, Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import { useAuthStore } from '@/store';
import { Images } from '@/assets/images';
import { ScreenContainer } from '@/layouts';
import { Button, Spacer, Text } from '@/components';

const AuthScreen = () => {
  const { authenticate, loading } = useAuthStore(state => state);

  const handleOpenSettings = async () => {
    try {
      if (Platform.OS === 'android') {
        // Open security device's settings in android
        await Linking.sendIntent('android.settings.SECURITY_SETTINGS');
      } else if (Platform.OS === 'ios') {
        // Due to iOS access limitation, we can only open app settings
        await Linking.openURL('app-settings:');
      }
    } catch {
      Alert.alert('Failed to open settings');
    }
  };

  const handleAuthenticate = async () => {
    const result = await authenticate();

    const errorTitle = 'Failed to authenticate';
    if (result.status === 'error') {
      Alert.alert(errorTitle, 'An error occurs while authenticating');
    }

    if (result.status === 'not_supported') {
      Alert.alert(errorTitle, 'Sorry, your device not supports biometric');
    }

    if (result.status === 'not_enrolled') {
      Alert.alert(errorTitle, 'Please setup biometrics in your device', [
        {
          text: 'Settings',
          onPress: handleOpenSettings,
        },
        {
          text: 'Cancel',
        },
      ]);
    }
  };

  return (
    <ScreenContainer title="Authentication" loading={loading}>
      <View style={styles.container}>
        <Images.SecurePassword width={150} height={150} />
        <Spacer height={8} />
        <Text type="secondary">Authenticate to use this app</Text>
        <Spacer height={12} />
        <Button title="Authenticate" onPress={handleAuthenticate} />
      </View>
    </ScreenContainer>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
