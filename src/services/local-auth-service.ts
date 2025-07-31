/**
 * Handle local authentication in the app
 * This class will contain centralized logic for local authentication flow
 */

import * as LocalAuthentication from 'expo-local-authentication';

type LocalAuthStatus = 'success' | 'error' | 'not_enrolled' | 'not_supported';

export type LocalAuthResult = {
  status: LocalAuthStatus;
  error?: Error;
  warning?: string;
};

class LocalAuthService {
  async authenticate(): Promise<LocalAuthResult> {
    try {
      const [hasHardware, isEnrolled] = await Promise.all([
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
      ]);

      if (!hasHardware) {
        return {
          status: 'not_supported',
          error: new Error('This device not support local authentication'),
        };
      }

      if (!isEnrolled) {
        return {
          status: 'not_enrolled',
          error: new Error('Please setup biometrics in your device'),
        };
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to proceed using app',
        cancelLabel: 'Cancel',
      });

      if (result.success) {
        return {
          status: 'success',
        };
      } else {
        return {
          status: 'error',
          error: new Error(result.error),
          warning: result.warning,
        };
      }
    } catch (error: any) {
      return {
        status: 'error',
        error: error,
      };
    }
  }
}

export const localAuthService = new LocalAuthService();
