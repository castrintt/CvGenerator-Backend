import { JwtService } from '@nestjs/jwt';
import { SignInAuthResult } from 'src/application/dto/response/user/signInAuth.response';
import { UserMapper } from 'src/application/mapper/user.mapper';
import { UserEntity } from 'src/domain/entities/user.entity';

export function issueAuthTokensForUser(
  userEntity: UserEntity,
  jwtService: JwtService,
): SignInAuthResult {
  const accessPayload = {
    sub: userEntity.id,
    email: userEntity.email,
    type: 'access' as const,
  };
  const refreshPayload = {
    sub: userEntity.id,
    email: userEntity.email,
    type: 'refresh' as const,
  };

  const accessToken = jwtService.sign(accessPayload);
  const refreshToken = jwtService.sign(refreshPayload, { expiresIn: '7d' });

  const user = UserMapper.fromDomainToResponse(userEntity);
  return new SignInAuthResult(
    user.id,
    user.name,
    user.email,
    user.createdAt,
    user.updatedAt,
    accessToken,
    refreshToken,
  );
}
