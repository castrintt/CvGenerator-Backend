import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CategoryRepository, CategoryRepositorySymbol } from "src/infrastructure/repository/category.repository";
import { EntityNotFoundError, Repository } from "typeorm";
import { UpdateCategoryCommand } from "../../category.commands";

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
    constructor(
        @Inject(CategoryRepositorySymbol)
        private readonly _category_repository: Repository<CategoryRepository>,
    ) { }

    async execute(command: UpdateCategoryCommand): Promise<boolean> {
        const category = await this._category_repository.findOne({ where: { id: command.id } });
        if (!category) throw new EntityNotFoundError(CategoryRepository, command.id);
        category.name = command.name;
        category.updatedAt = new Date();
        const result = await this._category_repository.update(command.id, category);
        return result?.affected && result.affected > 0 ? true : false;
    }
}