import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetByIdResponse } from 'src/application/dto/response/user/getById.response';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import { GetCurrentUserQuery } from '../../user.query';

@Injectable()
@QueryHandler(GetCurrentUserQuery)
export class GetCurrentUserHandler implements IQueryHandler<GetCurrentUserQuery> {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
  ) {}

  async execute(query: GetCurrentUserQuery): Promise<GetByIdResponse> {
    return this._user_repository.findById(query.authenticatedUserId);
  }
}
