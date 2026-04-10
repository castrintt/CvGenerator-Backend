import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryController } from "src/api/category.controller";
import { CreateCategoryHandler } from "src/application/commands/handlers/category/createCategory.handler";
import { DeleteCategoryHandler } from "src/application/commands/handlers/category/deleteCategory.handler";
import { UpdateCategoryHandler } from "src/application/commands/handlers/category/updateCategory.handler";
import { FindAllCategoriesHandler } from "src/application/queries/handlers/category/findAllCategorys.handler";
import { DatabaseModule } from "src/infrastructure/db/database.module";
import { categoryProviders } from "src/infrastructure/repository/category.repository";
import { userProviders } from "src/infrastructure/repository/user.repository";

@Module({
    imports: [CqrsModule, DatabaseModule],
    controllers: [CategoryController],
    providers: [
        //commands
        DeleteCategoryHandler,
        UpdateCategoryHandler,
        CreateCategoryHandler,

        //queries
        FindAllCategoriesHandler,

        //repository
        ...categoryProviders,
        ...userProviders,
    ],
})
export class CategoryContainerModule { }