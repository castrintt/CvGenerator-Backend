import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { Request } from 'express';
import {
  CreateCategoryCommand,
  DeleteCategoryCommand,
  UpdateCategoryCommand,
} from 'src/application/commands/category.commands';
import { CreateCategoryRequest } from 'src/application/dto/request/category/create.request';
import { UpdateCategoryRequest } from 'src/application/dto/request/category/update.request';
import { FindAllCategoriesResponse } from 'src/application/dto/response/category/findAll.response';
import { FindAllCategoriesQuery } from 'src/application/queries/category.query';
import { brParseUuidPipe } from 'src/shared/pipes/br-parse-uuid.pipe';

type AuthenticatedRequest = Request & { user: { userId: string; email: string } };

@Controller('category')
export class CategoryController {
  constructor(
    private readonly _query_bus: QueryBus,
    private readonly _command_bus: CommandBus,
  ) {}

  @Post('create')
  async createCategory(
    @Req() req: AuthenticatedRequest,
    @Body() request: CreateCategoryRequest,
  ): Promise<void> {
    const command = new CreateCategoryCommand(
      req.user.userId,
      request.name,
      request.order,
    );
    return this._command_bus.execute(command);
  }

  @Put('update')
  @SkipThrottle({ short: true, medium: true, long: true })
  async updateCategory(
    @Req() req: AuthenticatedRequest,
    @Body() request: UpdateCategoryRequest,
  ): Promise<void> {
    const command = new UpdateCategoryCommand(
      request.id,
      req.user.userId,
      request.name,
      request.order,
    );
    return this._command_bus.execute(command);
  }

  @Delete('delete')
  async deleteCategory(
    @Req() req: AuthenticatedRequest,
    @Query('id', brParseUuidPipe) id: string,
  ): Promise<void> {
    const command = new DeleteCategoryCommand(id, req.user.userId);
    return this._command_bus.execute(command);
  }

  @Get('findAll')
  @SkipThrottle({ short: true, medium: true, long: true })
  async findAllCategories(
    @Req() req: AuthenticatedRequest,
  ): Promise<FindAllCategoriesResponse[]> {
    const query = new FindAllCategoriesQuery(req.user.userId);
    return this._query_bus.execute(query);
  }
}
