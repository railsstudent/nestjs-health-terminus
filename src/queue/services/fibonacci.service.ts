import { Injectable } from '@nestjs/common';

@Injectable()
export class FibonacciService {
  fibonacci(order: number): number[] {
    if (order < 0) {
      return [];
    }

    if (order === 0) {
      return [0];
    }

    if (order === 1) {
      return [0, 1];
    }

    const accumulators: number[] = [0, 1];
    const initFibonacciOrder = 2;
    return this.fibonacciAccumulator(order - initFibonacciOrder, accumulators);
  }

  private fibonacciAccumulator(order: number, accumulators: number[]): number[] {
    const secondLastFib = accumulators[accumulators.length - 2];
    const lastFib = accumulators[accumulators.length - 1];

    const nextFibonacci = secondLastFib + lastFib;
    const extendedAccumulators = [...accumulators, nextFibonacci];
    if (order === 0) {
      return extendedAccumulators;
    }

    return this.fibonacciAccumulator(order - 1, extendedAccumulators);
  }
}
