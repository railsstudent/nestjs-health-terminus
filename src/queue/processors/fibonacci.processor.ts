// import { FibonacciService } from '@/queue';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { FibonacciService } from '../services';

@Processor('fibonacci')
export class FibonacciProcessor {
  constructor(private fibonacciService: FibonacciService) {}

  @Process()
  calculateNFibonacciNumbers({ data }: Job<{ order: number }>): void {
    const fibSequences = this.fibonacciService.fibonacci(data.order);
    console.log(`${new Date()} Calculating ${data.order + 1} fibonacci numbers...`);
    for (let i = 0; i < data.order; i++) {
      console.log(`${new Date()} - Fib(${i}) = ${fibSequences[i]}`);
    }
  }
}
