import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { systemLogger } from './utls/logger';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

/**
 * Usage and Description - This file will act as the main
 * bootstrap instance to initiate a server instance
 *
 **/

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: systemLogger,
  });
  app.enableCors();
  app.useStaticAssets(join(__dirname, '../../client/build/static'));
  const options = new DocumentBuilder()
    .setTitle('Craft E-commerce API')
    .setDescription(
      'All APIs needed to manage the Craft E-commerce application ',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.SERVER_PORT || 5000);
}
bootstrap();
