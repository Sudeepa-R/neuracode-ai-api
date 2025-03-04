import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT;
  await app.listen(PORT ?? 3000);
  Logger.log(` 🚀 Server running at http://localhost:${PORT}`);
}
bootstrap();
