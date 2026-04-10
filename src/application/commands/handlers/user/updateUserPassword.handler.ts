import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepository, UserRepositorySymbol } from "src/infrastructure/repository/user.repository";
import { PasswordToHash } from "src/shared/utils/passwordToHash";
import { EntityNotFoundError, Repository } from "typeorm";
import { UpdateUserPasswordCommand } from "../../user.command";


@Injectable()
@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler implements ICommandHandler<UpdateUserPasswordCommand> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: Repository<UserRepository>,
    ) { }

    async execute(command: UpdateUserPasswordCommand): Promise<boolean> {
        const user = await this._user_repository.findOne({ where: { id: command.id } });
        if (!user) throw new EntityNotFoundError(UserRepository, command.id);
        user.password = await PasswordToHash.hash(command.password);
        user.updatedAt = new Date();
        const result = await this._user_repository.update(command.id, user);
        return result?.affected && result.affected > 0 ? true : false;
    }
}