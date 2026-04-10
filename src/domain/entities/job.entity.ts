
export class JobEntity {
    constructor(
        public readonly id: string,
        public readonly enterpriseName: string,
        public readonly jobTitle: string,
        public readonly candidatedAt: Date,
        public readonly jobLink: string | undefined,
        public readonly observation: string | undefined,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }
}