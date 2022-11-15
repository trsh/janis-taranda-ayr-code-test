import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // NOTE: in production we would log to Database with rolling strategy
    // and switch back to console on local env.
    // logger: ['error', 'warn'],
    cors: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Parser API')
    .setDescription('Parser API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
