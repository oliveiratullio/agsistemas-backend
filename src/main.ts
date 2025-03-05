import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { dump } from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('Desafio Backend API')
    .setDescription('API para gerenciamento de produtos')
    .setVersion('1.0')
    .addTag('produtos')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
  writeFileSync('./swagger-spec.yaml', dump(document, { noRefs: true }));
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
