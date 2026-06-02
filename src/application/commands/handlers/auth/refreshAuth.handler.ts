import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SignInAuthResult } from 'src/application/dto/response/user/signInAuth.response';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import { ApiErrorMessages } from 'src/shared/constants/api-error-messages';
import { issueAuthTokensForUser } from 'src/shared/utils/issue-auth-tokens-for-user';
import { RefreshAuthCommand } from '../../auth.command';

type JwtRefreshPayload = { sub: string; email: string; type: string };

@CommandHandler(RefreshAuthCommand)
export class RefreshAuthHandler implements ICommandHandler<RefreshAuthCommand> {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
    private readonly _jwt_service: JwtService,
  ) {}

  async execute(command: RefreshAuthCommand): Promise<SignInAuthResult> {
    if (!command.refreshToken?.trim()) {
      throw new UnauthorizedException(
        ApiErrorMessages.auth.refreshTokenMissing,
      );
    }

    let payload: JwtRefreshPayload;
    try {
      payload = this._jwt_service.verify<JwtRefreshPayload>(command.refreshToken);
    } catch {
      throw new UnauthorizedException(
        ApiErrorMessages.auth.refreshTokenInvalidOrExpired,
      );
    }

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException(
        ApiErrorMessages.auth.refreshTokenInvalidOrExpired,
      );
    }

    const userEntity = await this._user_repository.findUserEntityByEmail(
      payload.email,
    );
    if (!userEntity || userEntity.id !== payload.sub) {
      throw new UnauthorizedException(ApiErrorMessages.auth.sessionInvalid);
    }

    return issueAuthTokensForUser(userEntity, this._jwt_service);
  }
}
