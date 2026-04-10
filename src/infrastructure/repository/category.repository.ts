
import { Column, DataSource, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRepository } from './user.repository';
import { JobRepository } from './job.repository';

@Entity('category')
export class CategoryRepository {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 150 })
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => UserRepository, (user) => user.categories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: UserRepository

    @OneToMany(() => JobRepository, (job) => job.category)
    jobs: JobRepository[]
}

export const CategoryRepositorySymbol = Symbol('CategoryRepository');

export const categoryProviders = [
    {
        provide: CategoryRepositorySymbol,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CategoryRepository),
        inject: ['DATA_SOURCE'],
    },
];
