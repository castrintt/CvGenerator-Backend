import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand, DeleteUserCommand, SendUserResetPasswordEmailCommand, UpdateUserCommand, UpdateUserPasswordCommand } from 'src/application/commands/user.command';
import { CreateRequest } from 'src/application/dto/request/user/create.request';
import { UpdateUserRequest } from 'src/application/dto/request/user/update.request';
import { UpdateUserPasswordRequest } from 'src/application/dto/request/user/updatePassword.request';
import { GetByIdResponse } from 'src/application/dto/response/user/getById.response';
import { GetUserByIdQuery } from 'src/application/queries/user.query';
import { EmailUnique } from 'src/shared/decorator/email-unique.decorator';
import { Public } from 'src/shared/decorator/public.decorator';
import { EmailAlreadyExistsGuard } from 'src/shared/guard/email-already-exists.guard';

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    private readonly _command_bus: CommandBus,
    private readonly _query_bus: QueryBus,
  ) { }

  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<GetByIdResponse> {
    const query = new GetUserByIdQuery(id);
    return this._query_bus.execute<GetUserByIdQuery, GetByIdResponse>(query);
  }

  @Post('create')
  @Public()
  @EmailUnique('create')
  @UseGuards(EmailAlreadyExistsGuard)
  async createUser(@Body() request: CreateRequest): Promise<void> {
    const command = new CreateUserCommand(request.name, request.email, request.password);
    return this._command_bus.execute<CreateUserCommand>(command);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new DeleteUserCommand(id);
    return this._command_bus.execute<DeleteUserCommand>(command);
  }

  @Put('update')
  @EmailUnique('update')
  @UseGuards(EmailAlreadyExistsGuard)
  async updateUser(@Query('id', ParseUUIDPipe) id: string, @Body() request: UpdateUserRequest): Promise<void> {
    const command = new UpdateUserCommand(id, request.name, request.email);
    return this._command_bus.execute<UpdateUserCommand>(command);
  }

  @Put('update_password')
  async updateUserPassword(@Query('id', ParseUUIDPipe) id: string, @Body() request: UpdateUserPasswordRequest): Promise<void> {
    const command = new UpdateUserPasswordCommand(id, request.password);
    return this._command_bus.execute<UpdateUserPasswordCommand>(command);
  }

  @Post('send_email_reset_password')
  async sendEmailResetPassword(@Query('id') id: string): Promise<void> {
    const command = new SendUserResetPasswordEmailCommand(id);
    return this._command_bus.execute<SendUserResetPasswordEmailCommand>(command);
  }

}
