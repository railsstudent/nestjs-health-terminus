import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmConfig = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: configService.get<string>('DATABASE_CONNECT', 'postgres') as any,
      host: configService.get<string>('DATABASE_HOST', 'postgres'),
      port: configService.get<number>('DATABASE_PORT', 5432),
      username: configService.get<string>('DATABASE_USER', 'postgres'),
      password: configService.get<string>('DATABASE_PASSWORD', 'postgres'),
      database: configService.get<string>('DATABASE_NAME', 'testDB'),
      migrationsTableName: 'migrations',
      migrations: ['src/migrations/*.ts'],
      entities: ['**/*.entity.{ts.js}'],
      synchronize: false,
    };
  },
});
