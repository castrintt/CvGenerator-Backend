export class GetByIdResponse {
    constructor(
        public readonly userId: string,
        public readonly name: string,
        public readonly email: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }
}