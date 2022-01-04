import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initiate } from './config/db-setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const orm = await initiate();
  const generator = orm.getSchemaGenerator();
  await generator.generate();
  await generator.updateSchema();

  const config = new DocumentBuilder().setTitle('DB-server').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001, '0.0.0.0');
}
bootstrap();
