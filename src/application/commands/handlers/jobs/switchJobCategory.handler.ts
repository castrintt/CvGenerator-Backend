import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { type IJobRepository } from "src/domain/interfaces/IJobRepository";
import { JobRepositorySymbol } from "src/IoC/symbols/symbols";
import { SwitchJobCategoryCommand } from "../../job.commands";

@CommandHandler(SwitchJobCategoryCommand)
export class SwitchJobCategoryHandler implements ICommandHandler<SwitchJobCategoryCommand> {
    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: IJobRepository,
    ) { }

    async execute(command: SwitchJobCategoryCommand): Promise<boolean> {
        return true
    }
}