import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepositorySymbol } from "src/IoC/symbols/symbols";
import { type IUserRepository } from "src/domain/interfaces/IUserRepository";
import { DeleteUserCommand } from "../../user.command";

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {

    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: IUserRepository,
    ) { }

    async execute(command: DeleteUserCommand): Promise<boolean> {
        return true
    }
}