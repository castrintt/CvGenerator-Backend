import { Inject, Injectable } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetByIdResponse } from "src/application/dataTransferObjects/response/user/getById.response";
import { UserRepository, UserRepositorySymbol } from "src/infrastructure/repository/user.repository";
import { EntityNotFoundError, Repository } from "typeorm";
import { GetUserByIdQuery } from "../../user.query";


@Injectable()
@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: Repository<UserRepository>,
    ) { }


    async execute(query: GetUserByIdQuery): Promise<GetByIdResponse> {
        const user = await this._user_repository.findOne({ where: { id: query.userId }, relations: ['categories'] });
        if (!user) throw new EntityNotFoundError(UserRepository, query.userId);
        return new GetByIdResponse(
            user.id,
            user.name,
            user.email,
            user.createdAt,
            user.updatedAt,
        );
    }
}