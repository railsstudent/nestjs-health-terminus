import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap()
  .then(() => 'Application starts successfully.')
  .catch((err) => console.error(err));
