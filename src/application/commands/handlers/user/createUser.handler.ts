import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepositorySymbol } from "src/IoC/symbols/symbols";
import { type IUserRepository } from "src/domain/interfaces/IUserRepository";
import { CreateUserCommand } from "../../user.command";


@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: IUserRepository,
    ) { }

    async execute(command: CreateUserCommand): Promise<{ id: string }> {
        return { id: '1' }
    }

}