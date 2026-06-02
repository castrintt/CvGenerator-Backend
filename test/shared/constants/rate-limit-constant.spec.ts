import {
  AUTH_REFRESH_THROTTLE,
  AUTH_SIGN_IN_THROTTLE,
} from 'src/shared/constants/rate-limit-constant';

const THROTTLER_NAMES = ['short', 'medium', 'long'] as const;

describe('rate-limit-constant', () => {
  it.each(THROTTLER_NAMES)(
    'AUTH_SIGN_IN_THROTTLE define bucket %s',
    (bucketName) => {
      expect(AUTH_SIGN_IN_THROTTLE[bucketName]).toBeDefined();
      expect(typeof AUTH_SIGN_IN_THROTTLE[bucketName].limit).toBe('number');
      expect(typeof AUTH_SIGN_IN_THROTTLE[bucketName].ttl).toBe('number');
    },
  );

  it.each(THROTTLER_NAMES)(
    'AUTH_REFRESH_THROTTLE define bucket %s',
    (bucketName) => {
      expect(AUTH_REFRESH_THROTTLE[bucketName]).toBeDefined();
      expect(typeof AUTH_REFRESH_THROTTLE[bucketName].limit).toBe('number');
      expect(typeof AUTH_REFRESH_THROTTLE[bucketName].ttl).toBe('number');
    },
  );
});
