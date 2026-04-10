export class CreateJobCommand {
    constructor(
        public readonly enterpriseName: string,
        public readonly jobTitle: string,
        public readonly candidatedAt: Date,
        public readonly jobLink: string,
        public readonly observation: string,
        public readonly categoryId: string,
    ) { }
}

export class UpdateJobCommand {
    constructor(
        public readonly id: string,
        public readonly enterpriseName: string,
        public readonly jobTitle: string,
        public readonly candidatedAt: Date,
        public readonly jobLink: string,
        public readonly observation: string,
        public readonly name: string,
    ) { }
}


export class SwitchJobCategoryCommand {
    constructor(
        public readonly id: string,
        public readonly categoryId: string,
    ) { }
}

export class DeleteJobCommand {
    constructor(
        public readonly id: string,
    ) { }
}