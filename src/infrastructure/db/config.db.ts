import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function parsePort(value: string | undefined, fallback: number): number {
    if (value === undefined || value === "") return fallback;
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
}

export function createTypeOrmConfig(
    configService: ConfigService,
): TypeOrmModuleOptions {
    return {
        type: "mysql",
        host: configService.get<string>("DATABASE_HOST", "localhost"),
        port: parsePort(
            configService.get<string>("DATABASE_PORT"),
            3307,
        ),
        username: configService.get<string>("DATABASE_USER", "root"),
        password: configService.get<string>("DATABASE_PASSWORD", ""),
        database: configService.get<string>("DATABASE_NAME", "cvgenerator"),
        entities: [__dirname + "/../../**/*.entity{.ts,.js}"],
        synchronize: true,
    };
}
