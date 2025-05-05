import { Module } from '@nestjs/common';
import { PulsarModule } from '@sm/pulsar';
import { FibonacciConsumer } from './fibonacci/fibonacci.consumer';

@Module({
  imports: [PulsarModule],
  providers: [FibonacciConsumer],
})
export class JobsModule {}
