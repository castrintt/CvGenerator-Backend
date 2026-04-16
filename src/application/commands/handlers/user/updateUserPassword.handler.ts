import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepositorySymbol } from "src/IoC/symbols/symbols";
import { type IUserRepository } from "src/domain/interfaces/IUserRepository";
import { UpdateUserPasswordCommand } from "../../user.command";


@Injectable()
@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler implements ICommandHandler<UpdateUserPasswordCommand> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: IUserRepository,
    ) { }

    async execute(command: UpdateUserPasswordCommand): Promise<boolean> {
        return true
    }

}