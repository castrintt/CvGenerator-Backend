
import { Column, DataSource, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryRepository } from './category.repository';

@Entity('users')
export class UserRepository {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 150 })
    name: string;

    @Column({ length: 150 })
    email: string;

    @Column({ length: 150 })
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => CategoryRepository, (category) => category.user)
    categories: CategoryRepository[]
}

export const UserRepositorySymbol = Symbol('UserRepository');

export const userProviders = [
    {
        provide: UserRepositorySymbol,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserRepository),
        inject: ['DATA_SOURCE'],
    },
];
