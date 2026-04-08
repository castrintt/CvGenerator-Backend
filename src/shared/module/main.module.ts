import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserContainerModule } from 'src/IoC/containers/user.container';


@Module({
    imports: [CqrsModule.forRoot(), UserContainerModule],
})
export class AppModule { }
