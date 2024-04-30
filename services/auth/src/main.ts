import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(ConfigService).get('appConfig');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('/api/v1/auth');
  await app.listen(appConfig.PORT || 4000);
}
bootstrap();
