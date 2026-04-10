import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepository, UserRepositorySymbol } from "src/infrastructure/repository/user.repository";
import { EntityNotFoundError, Repository } from "typeorm";
import { UpdateUserCommand } from "../../user.command";


@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: Repository<UserRepository>,
    ) { }

    async execute(command: UpdateUserCommand): Promise<boolean> {
        const user = await this._user_repository.findOne({ where: { id: command.id } });
        if (!user) throw new EntityNotFoundError(UserRepository, command.id);
        user.name = command.name;
        user.email = command.email;
        user.updatedAt = new Date();
        const result = await this._user_repository.update(command.id, user);
        return result?.affected && result.affected > 0 ? true : false;
    }
}