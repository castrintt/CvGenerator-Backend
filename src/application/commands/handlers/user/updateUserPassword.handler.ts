import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import { ApiErrorMessages } from 'src/shared/constants/api-error-messages';
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
  ) {}

  async execute(command: UpdateUserPasswordCommand): Promise<boolean> {
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
    return this._user_repository.updatePassword(
      command.authenticatedUserId,
      hashedPassword,
    );
  }
}
