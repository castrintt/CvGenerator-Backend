import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JobRepository, JobRepositorySymbol } from "src/infrastructure/repository/job.repository";
import { EntityNotFoundError, Repository } from "typeorm";
import { SwitchJobCategoryCommand } from "../../job.commands";

@CommandHandler(SwitchJobCategoryCommand)
export class SwitchJobCategoryHandler implements ICommandHandler<SwitchJobCategoryCommand> {
    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: Repository<JobRepository>,
    ) { }

    async execute(command: SwitchJobCategoryCommand): Promise<boolean> {
        const job = await this._job_repository.findOne({ where: { id: command.id } });
        if (!job) throw new EntityNotFoundError(JobRepository, command.id);
        job.category = command.categoryId;
        const result = await this._job_repository.update(command.id, job);
        return result?.affected && result.affected > 0 ? true : false;
    }
}