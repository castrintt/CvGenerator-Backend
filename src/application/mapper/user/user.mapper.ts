import { GetByIdResponse } from "src/application/dataTransferObjects/response/user/getById.response";
import { UserEntity } from "src/domain/entities/user.entity";

export class UserMapper {
    
    public static fromDomainToResponse(user: UserEntity): GetByIdResponse {
        return new GetByIdResponse(
            user.id,
            user.name,
            user.email,
            user.createdAt,
            user.updatedAt,
        );
    }

}