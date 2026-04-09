export class CreateUserCommand {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) { }
}

export class DeleteUserCommand {
    constructor(
        public readonly id: string,
    ) { }
}