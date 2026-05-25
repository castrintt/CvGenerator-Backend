export class GetCurrentUserQuery {
  constructor(public readonly authenticatedUserId: string) {}
}

export class FindUserByEmailQuery {
  constructor(public readonly email: string) {}
}
