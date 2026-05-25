import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendUserResetPasswordEmailCommand } from '../../user.command';

@Injectable()
@CommandHandler(SendUserResetPasswordEmailCommand)
export class SendUserResetPasswordEmailHandler
  implements ICommandHandler<SendUserResetPasswordEmailCommand>
{
  async execute(_command: SendUserResetPasswordEmailCommand): Promise<void> {
    // TODO: implementar envio de e-mail com link de redefinição de senha
  }
}
