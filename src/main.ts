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
  SwaggerModule.setup('api', app, document, {
    customfavIcon: 'https://petstore.swagger.io/favicon-32x32.png',
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    ],
    swaggerOptions: {
      deepLinking: false, // Disables `#` in URLs
      defaultModelsExpandDepth: -1, // Hides schemas/models section
    },
  });
  SwaggerModule.setup('/', app, document, {
    customfavIcon: 'https://petstore.swagger.io/favicon-32x32.png',
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    ],
    swaggerOptions: {
      deepLinking: false, // Disables `#` in URLs
      defaultModelsExpandDepth: -1, // Hides schemas/models section
    },
  });

  const PORT = process.env.PORT;
  await app.listen(PORT ?? 3000);
  Logger.log(` 🚀 Server running at http://localhost:${PORT}`);
}
bootstrap();
