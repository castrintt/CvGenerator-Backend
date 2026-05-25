import { IsEmail, IsString, MaxLength } from 'class-validator';
import { ValidationMessages } from 'src/shared/constants/validation-messages';

export class UpdateUserRequest {
  @IsString({ message: ValidationMessages.nameMustBeText })
  @MaxLength(150, { message: ValidationMessages.userNameMaxLength })
  public readonly name: string;

  @IsEmail({}, { message: ValidationMessages.emailInvalid })
  public readonly email: string;
}
