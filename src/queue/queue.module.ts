import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { FibonacciService } from './services';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'fibonacci',
    }),
    BullModule.registerQueue({
      name: 'fibonacci cube graph',
    }),
  ],
  providers: [FibonacciService],
  exports: [FibonacciService],
})
export class QueueModule {}
