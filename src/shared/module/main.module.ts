import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryContainerModule } from 'src/IoC/category.container';
import { JobsContainerModule } from 'src/IoC/job.container';
import { UserContainerModule } from 'src/IoC/user.container';


@Module({
    imports: [CqrsModule.forRoot(), UserContainerModule, JobsContainerModule, CategoryContainerModule],
})
export class AppModule { }
