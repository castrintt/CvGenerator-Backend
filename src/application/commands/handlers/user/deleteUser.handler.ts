import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepository, UserRepositorySymbol } from "src/infrastructure/repository/user.repository";
import { Repository } from "typeorm";
import { DeleteUserCommand } from "../../user.command";

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {

    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: Repository<UserRepository>,
    ) { }

    async execute(command: DeleteUserCommand): Promise<boolean> {
        const result = await this._user_repository.delete(command.id);
        return result?.affected && result.affected > 0 ? true : false;
    }
}