import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove keys when they are not in the DTO
      forbidNonWhitelisted: true, // throw an error when keys are not in the DTO
      transform: false, // transform payload to the DTO type
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
