import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
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
import { PasswordToHash } from 'src/shared/utils/passwordToHash';
import { UpdateUserPasswordCommand } from '../../user.command';

@Injectable()
@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler
  implements ICommandHandler<UpdateUserPasswordCommand>
{
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
    private readonly _jwt_service: JwtService,
  ) {}

  async execute(command: UpdateUserPasswordCommand): Promise<SignInAuthResult> {
    const user = await this._user_repository.findUserEntityById(
      command.authenticatedUserId,
    );
    if (!user) {
      throw new NotFoundException();
    }

    const currentPasswordMatches = await bcrypt.compare(
      command.currentPassword,
      user.password,
    );
    if (!currentPasswordMatches) {
      throw new UnauthorizedException(
        ApiErrorMessages.user.invalidCurrentPassword,
      );
    }

    if (command.currentPassword === command.newPassword) {
      throw new BadRequestException(
        ApiErrorMessages.user.newPasswordSameAsCurrent,
      );
    }

    const hashedPassword = await PasswordToHash.hash(command.newPassword);
    await this._user_repository.updatePassword(
      command.authenticatedUserId,
      hashedPassword,
    );

    const updatedUser = await this._user_repository.findUserEntityById(
      command.authenticatedUserId,
    );
    if (!updatedUser) {
      throw new NotFoundException();
    }

    return issueAuthTokensForUser(updatedUser, this._jwt_service);
  }
}
