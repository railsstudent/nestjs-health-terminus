import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { FibonacciService } from '@/queue';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fibonacciService: FibonacciService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('fib')
  getFibonacci(@Query('order') order: number): number {
    return this.fibonacciService.fibonacci(order);
  }
}
