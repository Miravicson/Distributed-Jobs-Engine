import { PulsarClient } from '@sm/pulsar';
import { Job } from '../decorators/job.decorators';
import { AbstractJob } from './abstract-job';

@Job({
  name: 'Fibonacci',
  description: 'Generate a Fibonnacci sequence and store it in the DB.',
})
export class FibonacciJob extends AbstractJob {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
