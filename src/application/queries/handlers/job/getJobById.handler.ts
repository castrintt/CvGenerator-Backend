import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetJobByIdResponse } from "src/application/dataTransferObjects/response/job/getById.response";
import { type IJobRepository } from "src/domain/interfaces/IJobRepository";
import { JobRepositorySymbol } from "src/IoC/symbols/symbols";
import { GetJobByIdQuery } from "../../job.query";

@QueryHandler(GetJobByIdQuery)
export class GetJobByIdHandler implements IQueryHandler<GetJobByIdQuery> {
    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: IJobRepository,
    ) { }

    async execute(query: GetJobByIdQuery): Promise<GetJobByIdResponse> {
        return {} as GetJobByIdResponse
    }
}