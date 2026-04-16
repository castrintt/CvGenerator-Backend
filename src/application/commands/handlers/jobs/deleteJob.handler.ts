import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JobRepositorySymbol } from "src/IoC/symbols/symbols";
import { type IJobRepository } from "src/domain/interfaces/IJobRepository";
import { DeleteJobCommand } from "../../job.commands";

@CommandHandler(DeleteJobCommand)
export class DeleteJobHandler implements ICommandHandler<DeleteJobCommand> {
    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: IJobRepository,
    ) { }

    async execute(command: DeleteJobCommand): Promise<boolean> {
        return true
    }
}