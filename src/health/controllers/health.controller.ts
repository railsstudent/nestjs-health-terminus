import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { BullQueueHealthIndicator } from '../health/bull-queue.health';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private bull: BullQueueHealthIndicator) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.bull.isHealthy(['fibonacci', 'prime'])]);
  }
}
