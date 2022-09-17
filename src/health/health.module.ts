import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers';
import { BullQueueHealthIndicator } from './health';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [BullQueueHealthIndicator],
})
export class HealthModule {}
