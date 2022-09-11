import { Processor } from '@nestjs/bull';

@Processor('prime')
export class PrimeProcessor {}
