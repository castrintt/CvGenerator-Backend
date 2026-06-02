import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/domain/entities/user.entity';
import { issueAuthTokensForUser } from 'src/shared/utils/issue-auth-tokens-for-user';

describe('issueAuthTokensForUser', () => {
  const userEntity = new UserEntity();
  userEntity.id = 'user-id';
  userEntity.name = 'Test User';
  userEntity.email = 'test@example.com';
  userEntity.createdAt = new Date('2024-01-01T00:00:00.000Z');
  userEntity.updatedAt = new Date('2024-01-02T00:00:00.000Z');

  it('should issue access and refresh tokens with user data', () => {
    const sign = jest
      .fn()
      .mockReturnValueOnce('access-token')
      .mockReturnValueOnce('refresh-token');
    const jwtService = { sign } as unknown as JwtService;

    const result = issueAuthTokensForUser(userEntity, jwtService);

    expect(sign).toHaveBeenNthCalledWith(1, {
      sub: 'user-id',
      email: 'test@example.com',
      type: 'access',
    });
    expect(sign).toHaveBeenNthCalledWith(
      2,
      {
        sub: 'user-id',
        email: 'test@example.com',
        type: 'refresh',
      },
      { expiresIn: '7d' },
    );
    expect(result).toMatchObject({
      id: 'user-id',
      name: 'Test User',
      email: 'test@example.com',
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });
  });
});
