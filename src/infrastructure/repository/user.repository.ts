
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @InjectRepository(UserEntity)
        private readonly _user_repository: Repository<UserEntity>,
    ) { }

}

