import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Shustov - Course')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'TOKEN',
    )
    .build();
  const pathToPhotos = `upload/`;
  fs.stat(pathToPhotos, function (err) {
    if (err && err.code === 'ENOENT') {
      fs.mkdirSync(pathToPhotos, { recursive: true });
    }
  });
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs/', app, swaggerDocument);
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
