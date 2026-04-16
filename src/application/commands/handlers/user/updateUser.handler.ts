import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { type IUserRepository } from "src/domain/interfaces/IUserRepository";
import { UserRepositorySymbol } from "src/IoC/symbols/symbols";
import { UpdateUserCommand } from "../../user.command";


@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: IUserRepository,
    ) { }

    async execute(command: UpdateUserCommand): Promise<boolean> {
        return true
    }
}