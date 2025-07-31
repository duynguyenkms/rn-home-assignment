import { localAuthService } from '@/services/local-auth-service';
import * as LocalAuthentication from 'expo-local-authentication';

jest.mock('expo-local-authentication');

const mockHasHardware = LocalAuthentication.hasHardwareAsync as jest.Mock;
const mockIsEnrolled = LocalAuthentication.isEnrolledAsync as jest.Mock;
const mockAuthenticate = LocalAuthentication.authenticateAsync as jest.Mock;

describe('localAuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return not_supported if device has no biometric hardware', async () => {
    mockHasHardware.mockResolvedValue(false);
    mockIsEnrolled.mockResolvedValue(true);

    const result = await localAuthService.authenticate();

    expect(result).toEqual({
      status: 'not_supported',
      error: new Error('This device not support local authentication'),
    });
  });

  it('should return not_enrolled if no biometrics are enrolled', async () => {
    mockHasHardware.mockResolvedValue(true);
    mockIsEnrolled.mockResolvedValue(false);

    const result = await localAuthService.authenticate();

    expect(result).toEqual({
      status: 'not_enrolled',
      error: new Error('Please setup biometrics in your device'),
    });
  });

  it('should return success if authentication succeeds', async () => {
    mockHasHardware.mockResolvedValue(true);
    mockIsEnrolled.mockResolvedValue(true);
    mockAuthenticate.mockResolvedValue({ success: true });

    const result = await localAuthService.authenticate();

    expect(result).toEqual({
      status: 'success',
    });
  });

  it('should return error with message if authentication fails', async () => {
    mockHasHardware.mockResolvedValue(true);
    mockIsEnrolled.mockResolvedValue(true);
    mockAuthenticate.mockResolvedValue({
      success: false,
      error: 'Authentication failed',
      warning: 'Face not recognized',
    });

    const result = await localAuthService.authenticate();

    expect(result.status).toBe('error');
    expect(result.error?.message).toBe('Authentication failed');
    expect(result.warning).toBe('Face not recognized');
  });

  it('should return error if unexpected exception is thrown', async () => {
    mockHasHardware.mockRejectedValue(new Error('Something blew up'));

    const result = await localAuthService.authenticate();

    expect(result.status).toBe('error');
    expect(result.error?.message).toBe('Something blew up');
  });
});
