import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrimeService } from '../services';

@Processor('prime')
export class PrimeProcessor {
  constructor(private primeService: PrimeService) {}

  @Process('prime-factors')
  findPrimeFactors({ data }: Job<{ input: number }>): void {
    const primeFactors = this.primeService.getPrimeFactors(data.input);
    console.log(`${new Date()} - All prime factors`, primeFactors);
  }

  @Process('distinct-prime-factors')
  findDistinctPrimeFactors({ data }: Job<{ products: number[] }>): void {
    const { primeFactors, count } = this.primeService.getDistinctPrimeFactors(data.products);
    console.log(`${new Date()} - Distinct prime factors`, primeFactors, 'count:', count);
  }

  @OnQueueActive()
  onJobActive(job: Job) {
    console.log(
      `onJobActive - id: ${job.id}, name: ${job.name}, data: `,
      job.data,
      ` starts at ${new Date(job.timestamp)}`,
    );
  }

  @OnQueueCompleted()
  onJobSuccess(job: Job, result: any) {
    console.log(
      `onJobSuccess - id: ${job.id}, name: ${job.name}, data: `,
      job.data,
      ` completes at ${new Date(job.finishedOn)}`,
      'result',
      result,
    );
  }
}
