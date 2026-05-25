export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class DeleteUserCommand {
  constructor(public readonly authenticatedUserId: string) {}
}

export class UpdateUserCommand {
  constructor(
    public readonly authenticatedUserId: string,
    public readonly name: string,
    public readonly email: string,
  ) {}
}

export class UpdateUserPasswordCommand {
  constructor(
    public readonly authenticatedUserId: string,
    public readonly currentPassword: string,
    public readonly newPassword: string,
  ) {}
}

export class SendUserResetPasswordEmailCommand {
  constructor(public readonly authenticatedUserId: string) {}
}
