import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepositorySymbol } from "src/IoC/symbols/symbols";
import { type IUserRepository } from "src/domain/interfaces/IUserRepository";
import { SendUserResetPasswordEmailCommand } from "../../user.command";

@Injectable()
@CommandHandler(SendUserResetPasswordEmailCommand)
export class SendUserResetPasswordEmailHandler implements ICommandHandler<SendUserResetPasswordEmailCommand> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: IUserRepository,
    ) { }

    async execute(command: SendUserResetPasswordEmailCommand): Promise<void> {
        // send email to user to access new password page (with token)
    }
}