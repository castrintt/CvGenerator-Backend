import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/module/main.module';
import { GlobalPipes } from './shared/pipes/global.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  GlobalPipes.apply(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
