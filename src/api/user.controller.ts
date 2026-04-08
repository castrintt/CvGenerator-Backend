import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseUUIDPipe,
  Post,
  Query
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand, DeleteUserCommand } from 'src/application/commands/user/user.command';
import { CreateRequest } from 'src/application/dataTransferObjects/request/user/create.request';
import { FindAllResponse } from 'src/application/dataTransferObjects/response/user/findAll.response';
import { GetByIdResponse } from 'src/application/dataTransferObjects/response/user/getById.response';
import { FindAllUsersQuery } from 'src/application/queries/user/findAll.query';
import { GetUserByIdQuery } from 'src/application/queries/user/getById.query';

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post('create')
  async createUser(@Body() request: CreateRequest): Promise<void> {
    const command = new CreateUserCommand(
      request.userId,
      request.name,
      request.email,
      request.password,
    );
    return this.commandBus.execute<CreateUserCommand>(command);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId', ParseUUIDPipe) userId: string): Promise<void> {
    const command = new DeleteUserCommand(userId);
    return this.commandBus.execute<DeleteUserCommand>(command);
  }


  @Get('findAll')
  async findAllUsers(@Query('page') page: number, @Query('limit') limit: number): Promise<FindAllResponse> {
    const query = new FindAllUsersQuery(page, limit);
    return this.queryBus.execute<FindAllUsersQuery>(query);
  }


  @Get(':userId')
  async getUserById(@Param('userId', ParseUUIDPipe) userId: string): Promise<GetByIdResponse> {
    const query = new GetUserByIdQuery(userId);
    return this.queryBus.execute<GetUserByIdQuery, GetByIdResponse>(query);
  }
}
