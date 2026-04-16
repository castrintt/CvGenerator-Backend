import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JobRepositorySymbol } from "src/IoC/symbols/symbols";
import { type IJobRepository } from "src/domain/interfaces/IJobRepository";
import { UpdateJobCommand } from "../../job.commands";

@CommandHandler(UpdateJobCommand)
export class UpdateJobHandler implements ICommandHandler<UpdateJobCommand> {
    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: IJobRepository,
    ) { }

    async execute(command: UpdateJobCommand): Promise<boolean> {
        return true
    }


}