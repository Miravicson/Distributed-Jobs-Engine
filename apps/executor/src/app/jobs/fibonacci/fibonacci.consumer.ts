import { Injectable, OnModuleInit } from '@nestjs/common';
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
    const result = iterate(data.iterations);
    this.logger.log(`Fibonnaci result: ${JSON.stringify(result)}`);
  }
}
