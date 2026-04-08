import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepositorySymbol } from 'src/IoC/symbols/user.symbol';
import { FindAllResponse } from 'src/application/dataTransferObjects/response/user/findAll.response';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { FindAllUsersQuery } from '../../user/findAll.query';

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersHandler implements IQueryHandler<FindAllUsersQuery> {

    constructor(
        @Inject(UserRepositorySymbol)
        private readonly userRepository: IUserRepository,
    ) { }


    async execute(query: FindAllUsersQuery): Promise<FindAllResponse> {
        console.log('query received', query);
        return {} as FindAllResponse
    }
}