export class CreateCategoryCommand {
    constructor(
        public readonly userId: string,
        public readonly name: string,
    ) { }
}

export class UpdateCategoryCommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) { }
}

export class DeleteCategoryCommand {
    constructor(
        public readonly id: string,
    ) { }
}