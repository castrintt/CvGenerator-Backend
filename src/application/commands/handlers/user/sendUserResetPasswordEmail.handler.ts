import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepository, UserRepositorySymbol } from "src/infrastructure/repository/user.repository";
import { Repository } from "typeorm";
import { SendUserResetPasswordEmailCommand } from "../../user.command";

@Injectable()
@CommandHandler(SendUserResetPasswordEmailCommand)
export class SendUserResetPasswordEmailHandler implements ICommandHandler<SendUserResetPasswordEmailCommand> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: Repository<UserRepository>,
    ) { }

    async execute(command: SendUserResetPasswordEmailCommand): Promise<void> {
        // send email to user to access new password page (with token)
    }
}