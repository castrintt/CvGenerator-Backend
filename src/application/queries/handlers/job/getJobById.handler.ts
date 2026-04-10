import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetJobByIdResponse } from "src/application/dataTransferObjects/response/job/getById.response";
import { JobRepository, JobRepositorySymbol } from "src/infrastructure/repository/job.repository";
import { EntityNotFoundError, Repository } from "typeorm";
import { GetJobByIdQuery } from "../../job.query";

@QueryHandler(GetJobByIdQuery)
export class GetJobByIdHandler implements IQueryHandler<GetJobByIdQuery> {
    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: Repository<JobRepository>,
    ) { }

    async execute(query: GetJobByIdQuery): Promise<GetJobByIdResponse> {
        const job = await this._job_repository.findOne({ where: { id: query.id } });
        if (!job) throw new EntityNotFoundError(JobRepository, query.id);
        return new GetJobByIdResponse(job.id, job.jobTitle, job.candidatedAt, job.jobLink, job.observation);
    }
}