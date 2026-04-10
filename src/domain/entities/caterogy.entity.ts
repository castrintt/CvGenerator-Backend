import { JobEntity } from "./job.entity";

export class CategoryEntity {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly jobs: JobEntity[],
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }
}