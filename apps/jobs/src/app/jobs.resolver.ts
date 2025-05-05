import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from './models/job.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from './dto/execute-job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'libs/graphql/src';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    return this.jobService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') input: ExecuteJobInput) {
    return this.jobService.executeJob(input.name, input.data);
  }
}
