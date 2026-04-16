import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CategoryRepositorySymbol } from "src/IoC/symbols/symbols";
import { FindAllCategoriesResponse } from "src/application/dataTransferObjects/response/category/findAll.response";
import { type ICategoryRepository } from "src/domain/interfaces/ICategoryRepository";
import { FindAllCategoriesQuery } from "../../category.query";

@QueryHandler(FindAllCategoriesQuery)
export class FindAllCategoriesHandler implements IQueryHandler<FindAllCategoriesQuery> {
    constructor(
        @Inject(CategoryRepositorySymbol)
        private readonly _category_repository: ICategoryRepository,
    ) { }

    async execute(query: FindAllCategoriesQuery): Promise<FindAllCategoriesResponse[]> {
        return []
    }


}

