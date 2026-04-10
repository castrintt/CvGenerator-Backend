export class UpdateCategoryRequest {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) { }
}