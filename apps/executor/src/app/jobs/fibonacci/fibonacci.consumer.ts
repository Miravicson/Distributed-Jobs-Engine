import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient, PulsarConsumer } from '@sm/pulsar';
import { FibonacciData } from './fibonacci-data.interface';
import { iterate } from 'fibonacci';

@Injectable()
export class FibonacciConsumer
  extends PulsarConsumer<FibonacciData>
  implements OnModuleInit
{
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonacci');
  }
  protected async onMessage(data: FibonacciData): Promise<void> {
    if (!data.iterations) {
      throw new BadRequestException('Invalid data');
    }
    const result = iterate(data.iterations);
    this.logger.log(`Fibonnaci result: ${JSON.stringify(result)}`);
  }
}
