import { IsString, MaxLength, MinLength } from 'class-validator';
import { ValidationMessages } from 'src/shared/constants/validation-messages';

export class UpdateUserPasswordRequest {
  @IsString({ message: ValidationMessages.currentPasswordRequired })
  @MinLength(8, { message: ValidationMessages.passwordMinLength })
  @MaxLength(20, { message: ValidationMessages.passwordMaxLength })
  public readonly currentPassword: string;

  @IsString({ message: ValidationMessages.newPasswordRequired })
  @MinLength(8, { message: ValidationMessages.passwordMinLength })
  @MaxLength(20, { message: ValidationMessages.passwordMaxLength })
  public readonly newPassword: string;
}
