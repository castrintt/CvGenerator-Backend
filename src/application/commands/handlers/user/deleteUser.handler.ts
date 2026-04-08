import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserCommand } from "../../user/user.command";


@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    async execute(command: DeleteUserCommand): Promise<void> {
        console.log('command received', command);
    }
}