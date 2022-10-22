import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

export const bullConfig = BullModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    redis: {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    },
  }),
});
