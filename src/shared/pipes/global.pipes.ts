import { INestApplication, ValidationPipe } from "@nestjs/common";

export class GlobalPipes {
    public static apply(app: INestApplication<any>): INestApplication<any> {
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
        }));
        return app;
    }
}