import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRepository, UserRepositorySymbol } from 'src/infrastructure/repository/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class EmailAlreadyExistInterceptor implements NestInterceptor {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: Repository<UserRepository>,
  ) { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const email = request.body.email;
    const user = await this._user_repository.findOne({ where: { email } });
    if (user) throw new BadRequestException('Email already exists');
    return next.handle();
  }
}
