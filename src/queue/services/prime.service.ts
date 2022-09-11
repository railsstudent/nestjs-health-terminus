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
}
