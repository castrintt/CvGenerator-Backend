import { SetMetadata } from '@nestjs/common';

export const EMAIL_UNIQUE_MODE_KEY = 'emailUniqueMode';

export type EmailUniqueMode = 'create' | 'update';

export const EmailUnique = (mode: EmailUniqueMode) =>
  SetMetadata(EMAIL_UNIQUE_MODE_KEY, mode);
