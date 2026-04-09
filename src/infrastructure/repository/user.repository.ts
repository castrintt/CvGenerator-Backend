
import { Column, DataSource, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export const UserRepositorySymbol = Symbol('UserRepository');

export const userProviders = [
    {
        provide: UserRepositorySymbol,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserRepository),
        inject: ['DATA_SOURCE'],
    },
];
