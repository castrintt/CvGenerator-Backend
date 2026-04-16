import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/domain/entities/category.entity";
import { ICategoryRepository } from "src/domain/interfaces/ICategoryRepository";
import { CategoryRepositorySymbol } from "src/IoC/symbols/symbols";
import { Repository } from "typeorm";


@Injectable()
export class CategoryRepository implements ICategoryRepository {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly _category_repository: Repository<CategoryEntity>,
    ) { }

}

