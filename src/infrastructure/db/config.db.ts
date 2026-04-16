import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const DATABASE_NAME = 'cvgenerator';
const DATABASE_PASSWORD = '113644Abe!ig';
const DATABASE_USER = 'root';
const DATABASE_HOST = 'localhost';
const DATABASE_PORT = 3307;


export const CONFIG_DB = {
    type: 'mysql',
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
} as TypeOrmModuleOptions