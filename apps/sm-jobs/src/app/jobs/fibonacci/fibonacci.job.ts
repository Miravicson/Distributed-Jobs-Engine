import { PulsarClient } from '@sm/pulsar';
import { Job } from '../../decorators/job.decorators';
import { AbstractJob } from '../abstract-job';
import { FibonacciData } from './fibonacci-data.interface';

@Job({
  name: 'Fibonacci',
  description: 'Generate a Fibonnacci sequence and store it in the DB.',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
