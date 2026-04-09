import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllResponse } from 'src/application/dataTransferObjects/response/user/findAll.response';
import { UserMapper } from 'src/application/mapper/user/user.mapper';
import { UserRepository, UserRepositorySymbol } from 'src/infrastructure/repository/user.repository';
import { Repository } from 'typeorm';
import { FindAllUsersQuery } from '../../user/findAll.query';

@Injectable()
@QueryHandler(FindAllUsersQuery)
export class FindAllUsersHandler implements IQueryHandler<FindAllUsersQuery> {

    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: Repository<UserRepository>,
    ) { }


    async execute(query: FindAllUsersQuery): Promise<FindAllResponse> {
        const found = await this._user_repository.find({
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        const response = new FindAllResponse(query.page, query.limit, found.map(user => UserMapper.fromDomainToResponse(user)));
        return response
    }
}