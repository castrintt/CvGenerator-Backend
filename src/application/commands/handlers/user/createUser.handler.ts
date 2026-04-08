import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../../user/user.command";


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    async execute(command: CreateUserCommand): Promise<void> {
        console.log('command received', command);
    }
}