export class UserEntity {
    constructor(
        public readonly userId: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }
}