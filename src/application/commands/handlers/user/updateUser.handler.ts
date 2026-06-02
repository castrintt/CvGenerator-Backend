import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SignInAuthResult } from 'src/application/dto/response/user/signInAuth.response';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import { issueAuthTokensForUser } from 'src/shared/utils/issue-auth-tokens-for-user';
import { normalizeEmail } from 'src/shared/utils/normalize-email';
import { UpdateUserCommand } from '../../user.command';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
    private readonly _jwt_service: JwtService,
  ) {}

  async execute(command: UpdateUserCommand): Promise<SignInAuthResult> {
    const user = await this._user_repository.findUserEntityById(
      command.authenticatedUserId,
    );
    if (!user) {
      throw new NotFoundException();
    }
    user.name = command.name.trim();
    user.email = normalizeEmail(command.email);
    await this._user_repository.update(user);
    return issueAuthTokensForUser(user, this._jwt_service);
  }
}
