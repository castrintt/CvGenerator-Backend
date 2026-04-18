import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import {
  EMAIL_UNIQUE_MODE_KEY,
  type EmailUniqueMode,
} from 'src/shared/decorator/email-unique.decorator';
import { normalizeEmail } from 'src/shared/utils/normalize-email';

const DUPLICATE_EMAIL_MESSAGE =
  'Já existe um usuário cadastrado com este e-mail.';

@Injectable()
export class EmailAlreadyExistsGuard implements CanActivate {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
    private readonly _reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const mode = this._reflector.getAllAndOverride<EmailUniqueMode>(
      EMAIL_UNIQUE_MODE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!mode) return true;

    const request = context.switchToHttp().getRequest<{ body?: { email?: string }; query?: { id?: string } }>();
    const rawEmail = request.body?.email;
    if (typeof rawEmail !== 'string' || !rawEmail.trim()) return true;

    const normalizedEmail = normalizeEmail(rawEmail);
    const existing = await this._user_repository.findUserEntityByEmail(
      normalizedEmail,
    );

    if (mode === 'create' && existing) throw new BadRequestException(DUPLICATE_EMAIL_MESSAGE);
    if (mode === 'create') return true;

    const userId = request.query?.id;
    if (existing && userId !== undefined && existing.id !== userId) {
      throw new BadRequestException(DUPLICATE_EMAIL_MESSAGE);
    }

    return true;
  }
}
