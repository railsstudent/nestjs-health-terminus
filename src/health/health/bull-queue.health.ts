import { getQueueToken } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { Queue } from 'bull';

export interface Dog {
  name: string;
  type: string;
}

@Injectable()
export class BullQueueHealthIndicator extends HealthIndicator {
  constructor(private moduleRef: ModuleRef) {
    super();
  }

  async isHealthy(queues: string[]): Promise<HealthIndicatorResult> {
    const promiseResults = await this.checkQueuesReady(queues);
    const errorResults = this.filterErrors(promiseResults);

    if (errorResults.length) {
      return this.getStatus('bull', false, { errors: errorResults });
    }

    return this.getStatus('bull', true);
  }

  private filterErrors(promiseResults: PromiseSettledResult<boolean>[]): string[] {
    const errorResults: string[] = [];
    for (const promiseResult of promiseResults) {
      if (promiseResult.status === 'rejected') {
        if (promiseResult.reason instanceof Error) {
          errorResults.push(promiseResult.reason.message);
        } else {
          errorResults.push(promiseResult.reason);
        }
      }
    }
    return errorResults;
  }

  private async checkQueuesReady(queues: string[]) {
    const promises = queues.map(async (name) => {
      const queueToken = this.moduleRef.get(getQueueToken(name), { strict: false });
      if ((queueToken as Queue).isReady) {
        const queue = await (queueToken as Queue).isReady();
        const isEveryClientReady = queue.clients.every((client) => client.status === 'ready');
        if (!isEveryClientReady) {
          throw new Error(`${name} - some redis client are not ready`);
        }
        return true;
      }
      throw new Error(`${name} is not a bull queue`);
    });

    return Promise.allSettled(promises);
  }
}