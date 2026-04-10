export class GetJobByIdResponse {
    constructor(
        public readonly id: string,
        public readonly jobTitle: string,
        public readonly candidatedAt: Date,
        public readonly jobLink: string,
        public readonly observation: string,
    ) { }
}