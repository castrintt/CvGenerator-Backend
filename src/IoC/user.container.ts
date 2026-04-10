import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from "src/api/user.controller";
import { CreateUserHandler } from "src/application/commands/handlers/user/createUser.handler";
import { DeleteUserHandler } from "src/application/commands/handlers/user/deleteUser.handler";
import { SendUserResetPasswordEmailHandler } from "src/application/commands/handlers/user/sendUserResetPasswordEmail.handler";
import { UpdateUserHandler } from "src/application/commands/handlers/user/updateUser.handler";
import { UpdateUserPasswordHandler } from "src/application/commands/handlers/user/updateUserPassword.handler";
import { GetUserByIdHandler } from "src/application/queries/handlers/user/getUserById.handler";
import { DatabaseModule } from "src/infrastructure/db/database.module";
import { userProviders } from "src/infrastructure/repository/user.repository";

@Module({
    imports: [CqrsModule, DatabaseModule],
    controllers: [UserController],
    providers: [
        //commands
        CreateUserHandler,
        DeleteUserHandler,
        UpdateUserHandler,
        UpdateUserPasswordHandler,
        SendUserResetPasswordEmailHandler,

        //queries
        GetUserByIdHandler,

        //repository
        ...userProviders,
    ],
})
export class UserContainerModule { }