export class FindAllUsersQuery {
    constructor(
        public readonly page: number,
        public readonly limit: number,
    ) { }
}