import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand, DeleteUserCommand } from 'src/application/commands/user/user.command';
import { CreateRequest } from 'src/application/dataTransferObjects/request/user/create.request';
import { FindAllResponse } from 'src/application/dataTransferObjects/response/user/findAll.response';
import { GetByIdResponse } from 'src/application/dataTransferObjects/response/user/getById.response';
import { FindAllUsersQuery } from 'src/application/queries/user/findAll.query';
import { GetUserByIdQuery } from 'src/application/queries/user/getById.query';
import { EmailAlreadyExistInterceptor } from 'src/shared/interceptor/email-already-exist.interceptor';

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

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


  @Get('findAll')
  async findAllUsers(@Query('page') page: number, @Query('limit') limit: number): Promise<FindAllResponse> {
    const query = new FindAllUsersQuery(page, limit);
    return this.queryBus.execute<FindAllUsersQuery>(query);
  }


  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<GetByIdResponse> {
    const query = new GetUserByIdQuery(id);
    return this.queryBus.execute<GetUserByIdQuery, GetByIdResponse>(query);
  }
}
