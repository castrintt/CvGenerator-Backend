import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import {
  CreateUserCommand,
  DeleteUserCommand,
  SendUserResetPasswordEmailCommand,
  UpdateUserCommand,
  UpdateUserPasswordCommand,
} from 'src/application/commands/user.command';
import { CreateRequest } from 'src/application/dto/request/user/create.request';
import { UpdateUserRequest } from 'src/application/dto/request/user/update.request';
import { UpdateUserPasswordRequest } from 'src/application/dto/request/user/updatePassword.request';
import { GetByIdResponse } from 'src/application/dto/response/user/getById.response';
import { GetCurrentUserQuery } from 'src/application/queries/user.query';
import { USER_CHANGE_PASSWORD_THROTTLE } from 'src/shared/constants/rate-limit-constant';
import { EmailUnique } from 'src/shared/decorator/email-unique.decorator';
import { Public } from 'src/shared/decorator/public.decorator';
import { EmailAlreadyExistsGuard } from 'src/shared/guard/email-already-exists.guard';

type AuthenticatedRequest = Request & { user: { userId: string; email: string } };

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    private readonly _command_bus: CommandBus,
    private readonly _query_bus: QueryBus,
  ) {}

  @Get('me')
  async getCurrentUser(
    @Req() req: AuthenticatedRequest,
  ): Promise<GetByIdResponse> {
    const query = new GetCurrentUserQuery(req.user.userId);
    return this._query_bus.execute<GetCurrentUserQuery, GetByIdResponse>(query);
  }

  @Post('create')
  @Public()
  @EmailUnique('create')
  @UseGuards(EmailAlreadyExistsGuard)
  async createUser(@Body() request: CreateRequest): Promise<void> {
    const command = new CreateUserCommand(
      request.name,
      request.email,
      request.password,
    );
    return this._command_bus.execute<CreateUserCommand>(command);
  }

  @Delete('me')
  async deleteUser(@Req() req: AuthenticatedRequest): Promise<void> {
    const command = new DeleteUserCommand(req.user.userId);
    return this._command_bus.execute<DeleteUserCommand>(command);
  }

  @Put('update')
  @EmailUnique('update')
  @UseGuards(EmailAlreadyExistsGuard)
  async updateUser(
    @Req() req: AuthenticatedRequest,
    @Body() request: UpdateUserRequest,
  ): Promise<void> {
    const command = new UpdateUserCommand(
      req.user.userId,
      request.name,
      request.email,
    );
    return this._command_bus.execute<UpdateUserCommand>(command);
  }

  @Put('update_password')
  @Throttle(USER_CHANGE_PASSWORD_THROTTLE)
  async updateUserPassword(
    @Req() req: AuthenticatedRequest,
    @Body() request: UpdateUserPasswordRequest,
  ): Promise<void> {
    const command = new UpdateUserPasswordCommand(
      req.user.userId,
      request.currentPassword,
      request.newPassword,
    );
    return this._command_bus.execute<UpdateUserPasswordCommand>(command);
  }

  @Post('send_email_reset_password')
  async sendEmailResetPassword(
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    const command = new SendUserResetPasswordEmailCommand(req.user.userId);
    return this._command_bus.execute<SendUserResetPasswordEmailCommand>(
      command,
    );
  }
}
