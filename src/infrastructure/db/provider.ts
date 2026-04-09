
import { DataSource } from 'typeorm';

const DATABASE_NAME = 'mysql-coursera';
const DATABASE_PASSWORD = '113644Abe!';
const DATABASE_USER = 'sa';
const DATABASE_HOST = 'localhost';
const DATABASE_PORT = 3306;

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: DATABASE_HOST,
                port: DATABASE_PORT,
                username: DATABASE_USER,
                password: DATABASE_PASSWORD,
                database: DATABASE_NAME,
                entities: [
                    __dirname + '/../**/*.repository{.ts,.js}',
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];
