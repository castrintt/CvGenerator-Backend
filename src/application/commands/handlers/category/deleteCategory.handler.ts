import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { type ICategoryRepository } from "src/domain/interfaces/ICategoryRepository";
import { CategoryRepositorySymbol } from "src/IoC/symbols/symbols";
import { DeleteCategoryCommand } from "../../category.commands";

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
    constructor(
        @Inject(CategoryRepositorySymbol)
        private readonly _category_repository: ICategoryRepository,
    ) { }

    async execute(command: DeleteCategoryCommand): Promise<boolean> {
        return true
    }
}