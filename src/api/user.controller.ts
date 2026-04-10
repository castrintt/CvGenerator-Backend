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
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand, DeleteUserCommand, SendUserResetPasswordEmailCommand, UpdateUserCommand, UpdateUserPasswordCommand } from 'src/application/commands/user.command';
import { CreateRequest } from 'src/application/dataTransferObjects/request/user/create.request';
import { UpdateUserRequest } from 'src/application/dataTransferObjects/request/user/update.request';
import { UpdateUserPasswordRequest } from 'src/application/dataTransferObjects/request/user/updatePassword.request';
import { GetByIdResponse } from 'src/application/dataTransferObjects/response/user/getById.response';
import { GetUserByIdQuery } from 'src/application/queries/user.query';
import { EmailAlreadyExistInterceptor } from 'src/shared/interceptor/email-already-exist.interceptor';

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<GetByIdResponse> {
    const query = new GetUserByIdQuery(id);
    return this.queryBus.execute<GetUserByIdQuery, GetByIdResponse>(query);
  }

  @Post('create')
  @UseInterceptors(EmailAlreadyExistInterceptor)
  async createUser(@Body() request: CreateRequest): Promise<void> {
    const command = new CreateUserCommand(request.name, request.email, request.password);
    return this.commandBus.execute<CreateUserCommand>(command);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new DeleteUserCommand(id);
    return this.commandBus.execute<DeleteUserCommand>(command);
  }

  @Put('update')
  async updateUser(@Query('id', ParseUUIDPipe) id: string, @Body() request: UpdateUserRequest): Promise<void> {
    const command = new UpdateUserCommand(id, request.name, request.email);
    return this.commandBus.execute<UpdateUserCommand>(command);
  }

  @Put('update_password')
  async updateUserPassword(@Query('id', ParseUUIDPipe) id: string, @Body() request: UpdateUserPasswordRequest): Promise<void> {
    const command = new UpdateUserPasswordCommand(id, request.password);
    return this.commandBus.execute<UpdateUserPasswordCommand>(command);
  }

  @Post('send_email_reset_password')
  async sendEmailResetPassword(@Query('id') id: string): Promise<void> {
    const command = new SendUserResetPasswordEmailCommand(id);
    return this.commandBus.execute<SendUserResetPasswordEmailCommand>(command);
  }

}
