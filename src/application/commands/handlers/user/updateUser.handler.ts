import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import { normalizeEmail } from 'src/shared/utils/normalize-email';
import { UpdateUserCommand } from '../../user.command';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
  ) {}

  async execute(command: UpdateUserCommand): Promise<boolean> {
    const user = await this._user_repository.findUserEntityById(
      command.authenticatedUserId,
    );
    if (!user) {
      throw new NotFoundException();
    }
    user.name = command.name.trim();
    user.email = normalizeEmail(command.email);
    return this._user_repository.update(user);
  }
}
