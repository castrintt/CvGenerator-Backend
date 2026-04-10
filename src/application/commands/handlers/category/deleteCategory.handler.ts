import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CategoryRepository, CategoryRepositorySymbol } from "src/infrastructure/repository/category.repository";
import { Repository } from "typeorm";
import { DeleteCategoryCommand } from "../../category.commands";

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
    constructor(
        @Inject(CategoryRepositorySymbol)
        private readonly _category_repository: Repository<CategoryRepository>,
    ) { }

    async execute(command: DeleteCategoryCommand): Promise<boolean> {
        const result = await this._category_repository.delete(command.id);
        return result?.affected && result.affected > 0 ? true : false;
    }
}