import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JobRepository, JobRepositorySymbol } from "src/infrastructure/repository/job.repository";
import { Repository } from "typeorm";
import { DeleteJobCommand } from "../../job.commands";

@CommandHandler(DeleteJobCommand)
export class DeleteJobHandler implements ICommandHandler<DeleteJobCommand> {
    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: Repository<JobRepository>,
    ) { }

    async execute(command: DeleteJobCommand): Promise<boolean> {
        const result = await this._job_repository.delete(command.id);
        return result?.affected && result.affected > 0 ? true : false;
    }
}