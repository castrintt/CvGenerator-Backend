import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JobRepository, JobRepositorySymbol } from "src/infrastructure/repository/job.repository";
import { EntityNotFoundError, Repository } from "typeorm";
import { UpdateJobCommand } from "../../job.commands";

@CommandHandler(UpdateJobCommand)
export class UpdateJobHandler implements ICommandHandler<UpdateJobCommand> {
    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: Repository<JobRepository>,
    ) { }

    async execute(command: UpdateJobCommand): Promise<boolean> {
        const job = await this._job_repository.findOne({ where: { id: command.id } });
        if (!job) throw new EntityNotFoundError(JobRepository, command.id);
        job.enterpriseName = command.enterpriseName;
        job.jobTitle = command.jobTitle;
        job.candidatedAt = command.candidatedAt;
        job.jobLink = command.jobLink;
        job.observation = command.observation;
        const result = await this._job_repository.update(command.id, job);
        return result?.affected && result.affected > 0 ? true : false;
    }
}