import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserHandler } from 'src/application/commands/handlers/user/updateUser.handler';
import { UpdateUserCommand } from 'src/application/commands/user.command';
import { UserEntity } from 'src/domain/entities/user.entity';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';

describe('UpdateUserHandler', () => {
  const userEntity = new UserEntity();
  userEntity.id = 'user-id';
  userEntity.name = 'Old Name';
  userEntity.email = 'old@example.com';
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

  const handler = new UpdateUserHandler(userRepository, jwtService);

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository.findUserEntityById.mockResolvedValue(userEntity);
    userRepository.update.mockResolvedValue(true);
    (jwtService.sign as jest.Mock)
      .mockReturnValueOnce('new-access-token')
      .mockReturnValueOnce('new-refresh-token');
  });

  it('should return SignInAuthResult with updated email and new tokens', async () => {
    const command = new UpdateUserCommand(
      'user-id',
      'New Name',
      'New@Example.com',
    );

    const result = await handler.execute(command);

    expect(userRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'New Name',
        email: 'new@example.com',
      }),
    );
    expect(result).toMatchObject({
      id: 'user-id',
      name: 'New Name',
      email: 'new@example.com',
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    });
  });

  it('should throw NotFoundException when user does not exist', async () => {
    userRepository.findUserEntityById.mockResolvedValue(null);

    await expect(
      handler.execute(new UpdateUserCommand('missing-id', 'Name', 'a@b.com')),
    ).rejects.toThrow(NotFoundException);
  });
});
