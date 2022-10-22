import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueModule } from './queue';
import { bullConfig, healthConfig } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    bullConfig,
    healthConfig,
    QueueModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
