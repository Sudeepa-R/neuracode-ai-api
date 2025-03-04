import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NeuraCode AI API')
    .setDescription('API documentation for NeuraCode AI')
    .setVersion('1.0')
    .addTag('Controllers')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('/', app, document);

  const PORT = process.env.PORT;
  await app.listen(PORT ?? 3000);
  Logger.log(` 🚀 Server running at http://localhost:${PORT}`);
}
bootstrap();
