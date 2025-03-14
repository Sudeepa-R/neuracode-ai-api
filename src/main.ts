import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import rateLimit from 'express-rate-limit';
import * as bodyParser from 'body-parser';
const compression = require('compression');
import * as chalk from 'chalk';
config();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin:'*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,  
    })
    
    app.use(
      rateLimit({
        windowMs: 1000, // 1 second
        max: 100, // limit each IP to 100 request per windows
        message: 'Too many requests. Please try again later.',
      }),
    );

    app.use(
      compression({
        threshold: 1024, // Compress responses only if size > 1KB
        level: 6, // Compression level (0-9, higher means better compression)
      }),
    );

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 5000,
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('NeuraCode AI API')
      .setDescription('API documentation for NeuraCode AI')
      .setVersion('1.0')
      .addBearerAuth()
      .addServer('/api')
      .addServer('/')
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
        // defaultModelsExpandDepth: -1, // Hides schemas/models section,
        docExpansion: 'none',
        tagsSorter: 'alpha',
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
        // defaultModelsExpandDepth: -1, // Hides schemas/models section
        docExpansion: 'none',
        tagsSorter: 'alpha',
      },
    });

    const PORT = process.env.PORT;
    await app.listen(PORT ?? 3000);
    const mongoDbName = chalk.hex('#87e8de').bold(process.env.MONGODB_NAME);
    Logger.log(` MongoDb ${mongoDbName} connected!!`);
    Logger.log(
      ` 🚀 Server running at ${chalk.hex('#87e8de').bold(`http://localhost:${PORT}`)} `,
    );
  } catch (err) {
    Logger.error(`❌ Error starting server : ${err}`, '', 'Boostrap', false);
    process.exit(1);
  }
}
bootstrap().catch((err) => {
  Logger.error(`❌ Error starting server : ${err}`, '', 'Boostrap', false);
  throw err;
});
