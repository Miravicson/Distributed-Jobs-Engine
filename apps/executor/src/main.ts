import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { init } from '@sm/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  await init(app);
}

bootstrap();
