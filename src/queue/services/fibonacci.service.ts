import { Injectable } from '@nestjs/common';

@Injectable()
export class FibonacciService {
  fibonacci(order: number): number {
    if (order <= 0) {
      return 0;
    }
    if (order === 1) {
      return 1;
    }

    const initFibonacciOrder = 2;
    return this.fibonacciAccumulator(order - initFibonacciOrder, 0, 1);
  }

  private fibonacciAccumulator(
    order: number,
    firstPrev: number,
    secondPrev: number,
  ): number {
    if (order === 0) {
      return firstPrev + secondPrev;
    }

    const nextFibonacci = firstPrev + secondPrev;
    return this.fibonacciAccumulator(order - 1, secondPrev, nextFibonacci);
  }

  fibonacciCubeGraph(order: number): number {
    const cubeOrder = 2;
    return this.fibonacci(order + cubeOrder);
  }
}
