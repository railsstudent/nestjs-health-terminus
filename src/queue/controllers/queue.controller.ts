import { InjectQueue } from '@nestjs/bull';
import { Controller, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('queue')
export class QueueController {
  constructor(
    @InjectQueue('fibonacci') private fibonacciQueue: Queue<{ order: number }>,
  ) {}

  @Post('fib')
  async getFibonacci(
    @Query('order', ParseIntPipe) order: number,
  ): Promise<void> {
    console.log(`${new Date()} - Job submitted to queue`, order);
    await this.fibonacciQueue.add({ order }, { delay: 2000 });
  }
}
