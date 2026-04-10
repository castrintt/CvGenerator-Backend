export class CreateCategoryRequest {
    constructor(
        public readonly userId: string,
        public readonly name: string,
    ) { }
}