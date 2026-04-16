import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobController } from "src/api/job.controller";
import { CreateJobHandler } from "src/application/commands/handlers/jobs/createJob.handler";
import { DeleteJobHandler } from "src/application/commands/handlers/jobs/deleteJob.handler";
import { SwitchJobCategoryHandler } from "src/application/commands/handlers/jobs/switchJobCategory.handler";
import { UpdateJobHandler } from "src/application/commands/handlers/jobs/updateJob.handler";
import { GetJobByIdHandler } from "src/application/queries/handlers/job/getJobById.handler";
import { JobEntity } from "src/domain/entities/job.entity";
import { JobRepository } from "src/infrastructure/repository/job.repository";
import { JobRepositorySymbol } from "../symbols/symbols";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([JobEntity]),
    ],
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
        {
            provide: JobRepositorySymbol,
            useClass: JobRepository,
        }
    ],

})
export class JobsContainerModule { }