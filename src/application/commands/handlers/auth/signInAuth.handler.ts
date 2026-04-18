import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { SignInAuthResult } from "src/application/dto/response/user/signInAuth.response";
import { UserMapper } from "src/application/mapper/user.mapper";
import { type IUserRepository } from "src/domain/interfaces/IUserRepository";
import { UserRepositorySymbol } from "src/modules/symbols/symbols";
import { normalizeEmail } from "src/shared/utils/normalize-email";
import { SignInAuthCommand } from "../../auth.command";

@CommandHandler(SignInAuthCommand)
export class SignInAuthHandler implements ICommandHandler<SignInAuthCommand> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: IUserRepository,
        private readonly _jwt_service: JwtService,
    ) { }

    async execute(command: SignInAuthCommand): Promise<SignInAuthResult> {
        const userEntity = await this._user_repository
            .findUserEntityByEmail(normalizeEmail(command.email));
        if (!userEntity) throw new NotFoundException('User not found with this email: ' + command.email);

        const passwordMatches = await bcrypt
            .compare(command.password, userEntity.password);
        if (!passwordMatches) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: userEntity.id, email: userEntity.email };
        const accessToken = this._jwt_service.sign(payload);
        const refreshToken = this._jwt_service.sign(payload, { expiresIn: '7d' });

        const user = UserMapper.fromDomainToResponse(userEntity);
        return new SignInAuthResult(
            user.id,
            user.name,
            user.email,
            user.createdAt,
            user.updatedAt,
            accessToken,
            refreshToken,
        );
    }
}
