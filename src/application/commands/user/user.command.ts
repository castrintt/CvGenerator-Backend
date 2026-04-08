export class CreateUserCommand {
    constructor(
        public readonly userId: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) { }
}

export class DeleteUserCommand {
    constructor(
        public readonly userId: string,
    ) { }
}