import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetByIdResponse } from "src/application/dataTransferObjects/response/user/getById.response";
import { UserMapper } from "src/application/mapper/user/user.mapper";
import { UserEntity } from "src/domain/entities/user.entity";
import { GetUserByIdQuery } from "../../user/getById.query";


@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
    async execute(query: GetUserByIdQuery): Promise<GetByIdResponse> {
        console.log('query received', query);
        const user = new UserEntity(
            'random id',
            'igor',
            'igordc38@gmail.com',
            '123456',
            new Date(),
            new Date()
        )
        return UserMapper.fromDomainToResponse(user);
    }
}