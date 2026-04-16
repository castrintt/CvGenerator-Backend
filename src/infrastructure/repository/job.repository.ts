
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from 'src/domain/entities/job.entity';
import { IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { JobRepositorySymbol } from 'src/IoC/symbols/symbols';
import { Repository } from 'typeorm';

@Injectable()
export class JobRepository implements IJobRepository {

    constructor(
        @InjectRepository(JobEntity)
        private readonly _job_repository: Repository<JobEntity>,
    ) { }
}
