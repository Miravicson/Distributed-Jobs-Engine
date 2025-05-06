import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

export async function init(app: INestApplication, startServer = true) {
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  if (startServer) {
    const port = app.get(ConfigService).getOrThrow('PORT');
    await app.listen(port);
    app
      .get(Logger)
      .log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
      );
  }

  return app;
}
