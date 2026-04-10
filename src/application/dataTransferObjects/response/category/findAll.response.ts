export class CategoryJobListItemResponse {
    constructor(
        public readonly id: string,
        public readonly jobTitle: string,
        public readonly candidatedAt: Date,
        public readonly jobLink: string | undefined,
        public readonly observation: string | undefined,
    ) { }
}


export class FindAllCategoriesResponse {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly jobs: CategoryJobListItemResponse[],
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }
}