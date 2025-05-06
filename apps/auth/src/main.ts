import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@sm/grpc';
import { join } from 'path';
import { init } from '@sm/nestjs';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await init(app, false);
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
    },
  });
  // Start microservices first
  await app.startAllMicroservices();

  // THEN start HTTP server
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();
