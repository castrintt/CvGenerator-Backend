import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CategoryRepository, CategoryRepositorySymbol } from "src/infrastructure/repository/category.repository";
import { UserRepository, UserRepositorySymbol } from "src/infrastructure/repository/user.repository";
import { EntityNotFoundError, Repository } from "typeorm";
import { CreateCategoryCommand } from "../../category.commands";

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
    constructor(
        @Inject(CategoryRepositorySymbol)
        private readonly _category_repository: Repository<CategoryRepository>,
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: Repository<UserRepository>,
    ) { }

    async execute(command: CreateCategoryCommand): Promise<boolean> {
        const user = await this._user_repository.findOne({ where: { id: command.userId } });
        if (!user) throw new EntityNotFoundError(UserRepository, command.userId);
        const category = new CategoryRepository();
        category.name = command.name;
        category.createdAt = new Date();
        category.updatedAt = new Date();
        category.user = user;
        await this._category_repository.save(category);
        return true;
    }
}