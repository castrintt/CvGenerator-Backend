import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordHandler } from 'src/application/commands/handlers/user/updateUserPassword.handler';
import { UpdateUserPasswordCommand } from 'src/application/commands/user.command';
import { UserEntity } from 'src/domain/entities/user.entity';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { PasswordToHash } from 'src/shared/utils/passwordToHash';

jest.mock('bcrypt');
jest.mock('src/shared/utils/passwordToHash');

describe('UpdateUserPasswordHandler', () => {
  const userEntity = new UserEntity();
  userEntity.id = 'user-id';
  userEntity.name = 'Test User';
  userEntity.email = 'test@example.com';
  userEntity.password = 'hashed-current-password';
  userEntity.createdAt = new Date('2024-01-01T00:00:00.000Z');
  userEntity.updatedAt = new Date('2024-01-02T00:00:00.000Z');

  const userRepository: jest.Mocked<IUserRepository> = {
    findUserEntityById: jest.fn(),
    findUserEntityByEmail: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updatePassword: jest.fn(),
    delete: jest.fn(),
  };

  const jwtService = {
    sign: jest
      .fn()
      .mockReturnValueOnce('new-access-token')
      .mockReturnValueOnce('new-refresh-token'),
  } as unknown as JwtService;

  const handler = new UpdateUserPasswordHandler(userRepository, jwtService);

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository.findUserEntityById.mockResolvedValue(userEntity);
    userRepository.updatePassword.mockResolvedValue(true);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (PasswordToHash.hash as jest.Mock).mockResolvedValue('hashed-new-password');
    (jwtService.sign as jest.Mock)
      .mockReturnValueOnce('new-access-token')
      .mockReturnValueOnce('new-refresh-token');
  });

  it('should return SignInAuthResult with new tokens after password update', async () => {
    const command = new UpdateUserPasswordCommand(
      'user-id',
      'current-password',
      'new-password',
    );

    const result = await handler.execute(command);

    expect(userRepository.updatePassword).toHaveBeenCalledWith(
      'user-id',
      'hashed-new-password',
    );
    expect(result).toMatchObject({
      id: 'user-id',
      email: 'test@example.com',
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    });
  });

  it('should throw NotFoundException when user does not exist', async () => {
    userRepository.findUserEntityById.mockResolvedValue(null);

    await expect(
      handler.execute(
        new UpdateUserPasswordCommand('missing-id', 'current', 'new'),
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw UnauthorizedException when current password is invalid', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      handler.execute(
        new UpdateUserPasswordCommand('user-id', 'wrong', 'new-password'),
      ),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw BadRequestException when new password equals current password', async () => {
    await expect(
      handler.execute(
        new UpdateUserPasswordCommand(
          'user-id',
          'same-password',
          'same-password',
        ),
      ),
    ).rejects.toThrow(BadRequestException);
  });
});
