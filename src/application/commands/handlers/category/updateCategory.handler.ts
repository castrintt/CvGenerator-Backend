import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { type ICategoryRepository } from "src/domain/interfaces/ICategoryRepository";
import { CategoryRepositorySymbol } from "src/IoC/symbols/symbols";
import { UpdateCategoryCommand } from "../../category.commands";

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
    constructor(
        @Inject(CategoryRepositorySymbol)
        private readonly _category_repository: ICategoryRepository,
    ) { }

    async execute(command: UpdateCategoryCommand): Promise<boolean> {
        return true
    }
}