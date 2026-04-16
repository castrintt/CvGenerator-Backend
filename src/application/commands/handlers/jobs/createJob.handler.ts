import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JobRepositorySymbol } from "src/IoC/symbols/symbols";
import { type IJobRepository } from "src/domain/interfaces/IJobRepository";
import { CreateJobCommand } from "../../job.commands";

@CommandHandler(CreateJobCommand)
export class CreateJobHandler implements ICommandHandler<CreateJobCommand> {
    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: IJobRepository,
    ) { }

    async execute(command: CreateJobCommand): Promise<boolean> {
        return true
    }

}   