import { Injectable } from '@nestjs/common';

@Injectable()
export class PrimeService {
  getPrimeFactors(num: number): number[] {
    if (num <= 1) {
      return [];
    }

    let copiedNum = num;
    const primeFactors: number[] = [];
    let currentPrimeFactor = 2;
    while (copiedNum % currentPrimeFactor === 0) {
      primeFactors.push(currentPrimeFactor);
      copiedNum = copiedNum / currentPrimeFactor;
    }

    const sqrtRoot = Math.floor(Math.sqrt(num));
    currentPrimeFactor = 3;
    while (currentPrimeFactor <= sqrtRoot) {
      while (copiedNum % currentPrimeFactor === 0) {
        primeFactors.push(currentPrimeFactor);
        copiedNum = copiedNum / currentPrimeFactor;
      }
      currentPrimeFactor = currentPrimeFactor + 2;
    }

    if (copiedNum > 2) {
      primeFactors.push(copiedNum);
    }
    return primeFactors;
  }

  getDistinctPrimeFactors(products: number[]): {
    primeFactors: number[];
    count: number;
  } {
    const factorSet = new Set<number>();

    for (const product of products) {
      const factors = this.getPrimeFactors(product);
      for (const factor of factors) {
        factorSet.add(factor);
      }
    }

    const primeFactors = Array.from(factorSet);
    return { primeFactors, count: primeFactors.length };
  }
}
