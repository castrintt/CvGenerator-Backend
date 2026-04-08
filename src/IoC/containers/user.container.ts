import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from "src/api/user.controller";
import { CreateUserHandler } from "src/application/commands/handlers/user/createUser.handler";
import { DeleteUserHandler } from "src/application/commands/handlers/user/deleteUser.handler";
import { FindAllUsersHandler } from "src/application/queries/handlers/user/findAllUsers.handler";
import { GetUserByIdHandler } from "src/application/queries/handlers/user/getUserById.handler";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { UserRepositorySymbol } from "../symbols/user.symbol";

@Module({
    imports: [CqrsModule],
    controllers: [UserController],
    providers: [
        //commands
        CreateUserHandler,
        DeleteUserHandler,

        //queries
        FindAllUsersHandler,
        GetUserByIdHandler,

        //repository
        {
            provide: UserRepositorySymbol,
            useClass: UserRepository,
        }
    ],
})
export class UserContainerModule { }