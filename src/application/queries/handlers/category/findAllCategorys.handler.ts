import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CategoryJobListItemResponse, FindAllCategoriesResponse } from "src/application/dataTransferObjects/response/category/findAll.response";
import { CategoryRepository, CategoryRepositorySymbol } from "src/infrastructure/repository/category.repository";
import { Repository } from "typeorm";
import { FindAllCategoriesQuery } from "../../category.query";

@QueryHandler(FindAllCategoriesQuery)
export class FindAllCategoriesHandler implements IQueryHandler<FindAllCategoriesQuery> {
    constructor(
        @Inject(CategoryRepositorySymbol)
        private readonly _category_repository: Repository<CategoryRepository>,
    ) { }

    async execute(query: FindAllCategoriesQuery): Promise<FindAllCategoriesResponse[]> {
        const categories = await this._category_repository.find({ where: { user: { id: query.userId } }, relations: ['jobs'] });
        return categories.map(categories => new FindAllCategoriesResponse(
            categories.id,
            categories.name,
            categories.jobs.map(job => new CategoryJobListItemResponse(
                job.id,
                job.jobTitle,
                job.candidatedAt,
                job.jobLink,
                job.observation
            )
            ),
            categories.createdAt,
            categories.updatedAt
        ));
    }


}

