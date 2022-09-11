import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { FibonacciService, PrimeService } from './services';
import { QueueController } from './controllers';
import { PrimeProcessor, FibonacciProcessor } from './processors';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'fibonacci',
    }),
    BullModule.registerQueue({
      name: 'prime',
    }),
  ],
  providers: [
    FibonacciService,
    FibonacciProcessor,
    PrimeProcessor,
    PrimeService,
  ],
  controllers: [QueueController],
})
export class QueueModule {}
