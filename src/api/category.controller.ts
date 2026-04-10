import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoryCommand, DeleteCategoryCommand, UpdateCategoryCommand } from 'src/application/commands/category.commands';
import { CreateCategoryRequest } from 'src/application/dataTransferObjects/request/category/create.request';
import { UpdateCategoryRequest } from 'src/application/dataTransferObjects/request/category/update.request';
import { FindAllCategoriesResponse } from 'src/application/dataTransferObjects/response/category/findAll.response';
import { FindAllCategoriesQuery } from 'src/application/queries/category.query';


@Controller('category')
export class CategoryController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) { }

  @Post('create')
  async createCategory(@Body() request: CreateCategoryRequest): Promise<void> {
    const command = new CreateCategoryCommand(request.userId, request.name);
    return this._commandBus.execute(command);
  }

  @Put('update')
  async updateCategory(@Body() request: UpdateCategoryRequest): Promise<void> {
    const command = new UpdateCategoryCommand(request.id, request.name);
    return this._commandBus.execute(command);
  }

  @Delete('delete')
  async deleteCategory(@Query('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new DeleteCategoryCommand(id);
    return this._commandBus.execute(command);
  }

  @Get('findAll')
  async findAllCategories(@Query('userId', ParseUUIDPipe) userId: string): Promise<FindAllCategoriesResponse[]> {
    const query = new FindAllCategoriesQuery(userId);
    return this._queryBus.execute(query);
  }

}
