import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Queue } from 'bull';
import { ArrayProductsDto } from '../dtos';

@Controller('queue')
export class QueueController {
  constructor(
    @InjectQueue('fibonacci') private fibonacciQueue: Queue<{ order: number }>,
    @InjectQueue('prime') private primeQueue: Queue,
  ) {}

  @Post('fib')
  async getFibonacci(
    @Query('order', ParseIntPipe) order: number,
  ): Promise<void> {
    console.log(`${new Date()} - Job submitted to queue`, order);
    await this.fibonacciQueue.add({ order }, { delay: 1000 });
  }

  @Post('prime-factors')
  async getPrimeFactors(
    @Query('input', ParseIntPipe) input: number,
  ): Promise<void> {
    console.log(
      `${new Date()} - Prime factors job submitted to prime queue`,
      input,
    );
    await this.primeQueue.add('prime-factors', { input }, { delay: 1000 });
  }

  @Post('distinct-prime-factors')
  async getDistinctPrimeFactors(
    @Body() arrayDto: ArrayProductsDto,
  ): Promise<void> {
    console.log(
      `${new Date()} - Distinct prime factor job submitted to prime queue`,
      arrayDto.products,
    );
    await this.primeQueue.add(
      'distinct-prime-factors',
      {
        products: arrayDto.products,
      },
      { delay: 2000 },
    );
  }
}
