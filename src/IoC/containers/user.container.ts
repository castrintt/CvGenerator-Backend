import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from "src/api/user.controller";
import { CreateUserHandler } from "src/application/commands/handlers/user/createUser.handler";
import { DeleteUserHandler } from "src/application/commands/handlers/user/deleteUser.handler";
import { SendUserResetPasswordEmailHandler } from "src/application/commands/handlers/user/sendUserResetPasswordEmail.handler";
import { UpdateUserHandler } from "src/application/commands/handlers/user/updateUser.handler";
import { UpdateUserPasswordHandler } from "src/application/commands/handlers/user/updateUserPassword.handler";
import { GetUserByIdHandler } from "src/application/queries/handlers/user/getUserById.handler";
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { UserRepositorySymbol } from "../symbols/symbols";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserEntity]),
    ],
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
        {
            provide: UserRepositorySymbol,
            useClass: UserRepository,
        },
    ],
    exports: [
        UserRepositorySymbol,
    ],
})
export class UserContainerModule { }