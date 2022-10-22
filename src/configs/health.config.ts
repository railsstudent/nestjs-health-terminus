import { ConfigService } from '@nestjs/config';
import { HttpHealthIndicator } from '@nestjs/terminus';
import { HealthModule } from 'nestjs-health';

export const healthConfig = HealthModule.forRootAsync({
  inject: [ConfigService, HttpHealthIndicator],
  useFactory: (configService: ConfigService, http: HttpHealthIndicator) => {
    return {
      app: 'nestjs-health-terminus',
      backendUrl: configService.get<string>('BACKEND_DOMAIN', ''),
      shouldCheckDatabase: true,
      queueNames: ['fibonacci', 'prime'],
      redisOptions: {
        host: configService.get<string>('REDIS_HOST', 'localhost'),
        port: configService.get<number>('REDIS_PORT', 0),
      },
      indicatorFunctions: [
        () => http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
        () => http.pingCheck('angular-docs', 'https://angular.io/docs'),
      ],
    };
  },
});
