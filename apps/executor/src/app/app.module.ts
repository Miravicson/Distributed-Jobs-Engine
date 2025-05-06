import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { LoggerModule } from '@sm/nestjs';

@Module({
  imports: [LoggerModule, ConfigModule.forRoot({ isGlobal: true }), JobsModule],
})
export class AppModule {}
