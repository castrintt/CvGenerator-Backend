import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { CORS_OPTIONS } from './shared/constants/cors.constant';
import { GlobalInterceptors } from './shared/interceptor/global.interceptors';
import { AppModule } from './shared/main.module';
import { GlobalPipes } from './shared/pipes/global.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser.default());
  app.enableCors(CORS_OPTIONS);
  GlobalPipes.apply(app);
  GlobalInterceptors.apply(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
