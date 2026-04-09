import { Inject, Injectable } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetByIdResponse } from "src/application/dataTransferObjects/response/user/getById.response";
import { UserMapper } from "src/application/mapper/user/user.mapper";
import { UserRepository, UserRepositorySymbol } from "src/infrastructure/repository/user.repository";
import { EntityNotFoundError, Repository } from "typeorm";
import { GetUserByIdQuery } from "../../user/getById.query";


@Injectable()
@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: Repository<UserRepository>,
    ) { }


    async execute(query: GetUserByIdQuery): Promise<GetByIdResponse> {
        const user = await this._user_repository.findOne({ where: { id: query.userId } });
        if (!user) throw new EntityNotFoundError(UserRepository, query.userId);;
        return UserMapper.fromDomainToResponse(user);
    }
}