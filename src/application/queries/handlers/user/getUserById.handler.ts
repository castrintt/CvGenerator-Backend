import { Inject, Injectable } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetByIdResponse } from "src/application/dataTransferObjects/response/user/getById.response";
import { type IUserRepository } from "src/domain/interfaces/IUserRepository";
import { UserRepositorySymbol } from "src/IoC/symbols/symbols";
import { GetUserByIdQuery } from "../../user.query";


@Injectable()
@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: IUserRepository,
    ) { }


    async execute(query: GetUserByIdQuery): Promise<GetByIdResponse> {
        return {} as GetByIdResponse
    }
}