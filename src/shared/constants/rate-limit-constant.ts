import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const RATE_LIMIT_OPTIONS = {
  throttlers: [
    {
      name: 'short',
      ttl: 1000,
      limit: 3,
    },
    {
      name: 'medium',
      ttl: 10000,
      limit: 20,
    },
    {
      name: 'long',
      ttl: 60000,
      limit: 100,
    },
  ],
} as ThrottlerModuleOptions;

/** POST /auth — reduz brute force e credential stuffing (por IP/rota). */
export const AUTH_SIGN_IN_THROTTLE = {
  short: { limit: 2, ttl: 10_000 },
  medium: { limit: 5, ttl: 60_000 },
  long: { limit: 25, ttl: 3_600_000 },
};

/** POST /auth/refresh — anti-abuso de rotação de refresh, mais folgado que o sign-in. */
export const AUTH_REFRESH_THROTTLE = {
  short: { limit: 5, ttl: 5_000 },
  medium: { limit: 15, ttl: 60_000 },
  long: { limit: 60, ttl: 3_600_000 },
};

/** PUT /users/update_password — reduz brute force na verificação de senha atual. */
export const USER_CHANGE_PASSWORD_THROTTLE = {
  short: { limit: 2, ttl: 10_000 },
  medium: { limit: 5, ttl: 60_000 },
  long: { limit: 15, ttl: 3_600_000 },
};
