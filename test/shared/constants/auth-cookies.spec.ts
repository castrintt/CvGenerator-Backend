import type { Response } from 'express';
import {
  AUTH_COOKIE_NAMES,
  clearAuthCookies,
  getAccessTokenSetCookieOptions,
  getAuthCookieSecurityOptions,
  getRefreshTokenSetCookieOptions,
} from 'src/shared/constants/auth-cookies';

describe('getAuthCookieSecurityOptions', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('em produção usa SameSite none e Secure', () => {
    process.env.NODE_ENV = 'production';
    expect(getAuthCookieSecurityOptions()).toEqual({
      secure: true,
      sameSite: 'none',
    });
  });

  it('fora de produção usa SameSite lax e Secure false (HTTP local)', () => {
    process.env.NODE_ENV = 'development';
    expect(getAuthCookieSecurityOptions()).toEqual({
      secure: false,
      sameSite: 'lax',
    });
  });
});

describe('getAccessTokenSetCookieOptions / getRefreshTokenSetCookieOptions', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('propagam httpOnly e segurança de produção nos accessors', () => {
    process.env.NODE_ENV = 'production';
    expect(getAccessTokenSetCookieOptions(1000)).toEqual(
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 1000,
      }),
    );
    expect(getRefreshTokenSetCookieOptions(2000)).toEqual(
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/auth',
        maxAge: 2000,
      }),
    );
  });
});

describe('clearAuthCookies', () => {
  it('should clear access and refresh cookies with paths / and /auth', () => {
    const clearCookie = jest.fn();
    const res = { clearCookie } as unknown as Response;

    clearAuthCookies(res);

    expect(clearCookie).toHaveBeenCalledTimes(2);
    expect(clearCookie).toHaveBeenNthCalledWith(
      1,
      AUTH_COOKIE_NAMES.accessToken,
      expect.objectContaining({ path: '/' }),
    );
    expect(clearCookie).toHaveBeenNthCalledWith(
      2,
      AUTH_COOKIE_NAMES.refreshToken,
      expect.objectContaining({ path: '/auth' }),
    );
  });
});
