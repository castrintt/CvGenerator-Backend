import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "src/api/category.controller";
import { CreateCategoryHandler } from "src/application/commands/handlers/category/createCategory.handler";
import { DeleteCategoryHandler } from "src/application/commands/handlers/category/deleteCategory.handler";
import { UpdateCategoryHandler } from "src/application/commands/handlers/category/updateCategory.handler";
import { FindAllCategoriesHandler } from "src/application/queries/handlers/category/findAllCategorys.handler";
import { CategoryEntity } from "src/domain/entities/category.entity";
import { CategoryRepository } from "src/infrastructure/repository/category.repository";
import { CategoryRepositorySymbol } from "../symbols/symbols";
import { UserContainerModule } from "./user.container";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([CategoryEntity]),
        UserContainerModule,
    ],
    controllers: [CategoryController],
    providers: [
        //commands
        DeleteCategoryHandler,
        UpdateCategoryHandler,
        CreateCategoryHandler,

        //queries
        FindAllCategoriesHandler,

        //repositories
        {
            provide: CategoryRepositorySymbol,
            useClass: CategoryRepository,
        },

    ],

})
export class CategoryContainerModule { }