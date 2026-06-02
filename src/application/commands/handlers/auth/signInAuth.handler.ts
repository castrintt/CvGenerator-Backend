import {
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInAuthResult } from 'src/application/dto/response/user/signInAuth.response';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import { ApiErrorMessages } from 'src/shared/constants/api-error-messages';
import { issueAuthTokensForUser } from 'src/shared/utils/issue-auth-tokens-for-user';
import { normalizeEmail } from 'src/shared/utils/normalize-email';
import { SignInAuthCommand } from '../../auth.command';

@CommandHandler(SignInAuthCommand)
export class SignInAuthHandler implements ICommandHandler<SignInAuthCommand> {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
    private readonly _jwt_service: JwtService,
  ) {}

  async execute(command: SignInAuthCommand): Promise<SignInAuthResult> {
    const userEntity = await this._user_repository.findUserEntityByEmail(
      normalizeEmail(command.email),
    );

    const passwordMatches =
      userEntity !== null &&
      (await bcrypt.compare(command.password, userEntity.password));

    if (!userEntity || !passwordMatches) {
      throw new UnauthorizedException(ApiErrorMessages.auth.invalidCredentials);
    }

    return issueAuthTokensForUser(userEntity, this._jwt_service);
  }
}
