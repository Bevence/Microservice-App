import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseHandlerInterceptor } from './response-handler/response-handler.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(ConfigService).get('appConfig');

  app.useGlobalInterceptors(new ResponseHandlerInterceptor());

  app.setGlobalPrefix('/api/v1/auth');
  await app.listen(appConfig.PORT || 4000);
}
bootstrap();
