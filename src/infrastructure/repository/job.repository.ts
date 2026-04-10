
import { Column, DataSource, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryRepository } from './category.repository';

@Entity('job')
export class JobRepository {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    enterpriseName: string

    @Column()
    jobTitle: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    candidatedAt: Date

    @Column({ length: 255, nullable: true })
    jobLink: string

    @Column({ length: 255, nullable: true })
    observation: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => CategoryRepository, (category) => category.jobs)
    @JoinColumn({ name: 'categoryId' })
    category: string;

}

export const JobRepositorySymbol = Symbol('JobRepository');

export const jobProviders = [
    {
        provide: JobRepositorySymbol,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(JobRepository),
        inject: ['DATA_SOURCE'],
    },
];
