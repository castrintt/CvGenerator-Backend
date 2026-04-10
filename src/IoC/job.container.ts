import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { JobController } from "src/api/job.controller";
import { CreateJobHandler } from "src/application/commands/handlers/jobs/createJob.handler";
import { DeleteJobHandler } from "src/application/commands/handlers/jobs/deleteJob.handler";
import { SwitchJobCategoryHandler } from "src/application/commands/handlers/jobs/switchJobCategory.handler";
import { UpdateJobHandler } from "src/application/commands/handlers/jobs/updateJob.handler";
import { GetJobByIdHandler } from "src/application/queries/handlers/job/getJobById.handler";
import { DatabaseModule } from "src/infrastructure/db/database.module";
import { jobProviders } from "src/infrastructure/repository/job.repository";

@Module({
    imports: [CqrsModule, DatabaseModule],
    controllers: [JobController],
    providers: [
        //commands
        CreateJobHandler,
        UpdateJobHandler,
        DeleteJobHandler,
        SwitchJobCategoryHandler,
        
        //queries
        GetJobByIdHandler,

        //repository
        ...jobProviders,
    ],
})
export class JobsContainerModule { }