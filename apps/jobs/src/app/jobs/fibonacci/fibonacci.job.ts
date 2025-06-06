import { PulsarClient } from '@sm/pulsar';
import { Job } from '../../decorators/job.decorators';
import { AbstractJob } from '../abstract-job';
import { FibonacciData } from './fibonacci-data.message';

@Job({
  name: 'Fibonacci',
  description: 'Generate a Fibonnacci sequence and store it in the DB.',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  protected messageClass = FibonacciData;
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
